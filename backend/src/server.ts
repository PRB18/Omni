import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db, initDb, RegionRow, FarmerRow } from './db/db.js';
import { seedDatabase } from './db/seed.js';
import { enrichRegionData } from './services/gemini.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 7860; // Default Hugging Face Space port

app.use(cors());
app.use(express.json());

// Initialize SQLite Database and seed
initDb();
seedDatabase();

function formatRegionRow(row: RegionRow) {
  return {
    id: row.id,
    state: row.state,
    district: row.district,
    lat: row.lat,
    lng: row.lng,
    primaryCrops: JSON.parse(row.primary_crops),
    soil: JSON.parse(row.soil),
    dataSource: row.data_source,
    lastUpdated: row.last_updated
  };
}

// REST API Endpoints
app.get('/api/regions', (req, res) => {
  try {
    const { bbox, zoom } = req.query;
    let query = `SELECT * FROM regions`;
    const params: any[] = [];

    if (bbox && typeof bbox === 'string') {
      const parts = bbox.split(',').map(Number);
      if (parts.length === 4 && parts.every(n => !isNaN(n))) {
        const [minLng, minLat, maxLng, maxLat] = parts;
        query += ` WHERE lng >= ? AND lng <= ? AND lat >= ? AND lat <= ?`;
        params.push(minLng, maxLng, minLat, maxLat);
      }
    }

    const rows = db.prepare(query).all(...params) as unknown as RegionRow[];
    const formatted = rows.map(formatRegionRow);
    const zoomNum = Number(zoom) || 6;

    if (zoomNum <= 5) {
      const stateMap: Record<string, any> = {};

      for (const reg of formatted) {
        if (!stateMap[reg.state]) {
          stateMap[reg.state] = {
            id: `STATE-${reg.state.toUpperCase().slice(0, 3)}`,
            state: reg.state,
            district: `${reg.state} Hub`,
            lat: reg.lat,
            lng: reg.lng,
            nodeCount: 0,
            totalProductionTonnes: 0,
            primaryCrops: reg.primaryCrops,
            soil: reg.soil,
            dataSource: 'hybrid',
            lastUpdated: reg.lastUpdated
          };
        }

        const cluster = stateMap[reg.state];
        cluster.nodeCount += 1;
        cluster.lat = (cluster.lat * (cluster.nodeCount - 1) + reg.lat) / cluster.nodeCount;
        cluster.lng = (cluster.lng * (cluster.nodeCount - 1) + reg.lng) / cluster.nodeCount;

        for (const crop of reg.primaryCrops) {
          cluster.totalProductionTonnes += crop.totalProductionTonnes || 0;
        }
      }

      return res.json(Object.values(stateMap));
    }

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ error: 'Failed to fetch regions' });
  }
});

app.get('/api/regions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const row = db.prepare('SELECT * FROM regions WHERE id = ?').get(id) as unknown as RegionRow | undefined;

    if (row) {
      return res.json(formatRegionRow(row));
    }

    const state = (req.query.state as string) || 'Telangana';
    const district = (req.query.district as string) || id;
    const lat = Number(req.query.lat) || 17.5;
    const lng = Number(req.query.lng) || 78.5;

    const enriched = await enrichRegionData(district, state, lat, lng, id);
    res.json(enriched);
  } catch (error) {
    console.error(`Error fetching region ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch region' });
  }
});

app.get('/api/regions/:id/farmers', (req, res) => {
  try {
    const { id } = req.params;
    const limit = Number(req.query.limit) || 50;

    const rows = db.prepare('SELECT * FROM farmers WHERE region_id = ? LIMIT ?').all(id, limit) as unknown as FarmerRow[];

    const formatted = rows.map(f => ({
      id: f.id,
      regionId: f.region_id,
      farmerNameOrAlias: f.farmer_name_or_alias,
      landHoldingAcres: f.land_holding_acres,
      cropsGrown: JSON.parse(f.crops_grown),
      yearsOfFarming: f.years_of_farming
    }));

    res.json(formatted);
  } catch (error) {
    console.error(`Error fetching farmers for ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch farmers' });
  }
});

app.post('/api/regions/:id/enrich', async (req, res) => {
  try {
    const { id } = req.params;
    const { district, state, lat, lng } = req.body;

    if (!district || !state || !lat || !lng) {
      return res.status(400).json({ error: 'Missing required body fields: district, state, lat, lng' });
    }

    const enriched = await enrichRegionData(district, state, Number(lat), Number(lng), id);
    res.json(enriched);
  } catch (error) {
    console.error(`Error enriching region ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to enrich region' });
  }
});

// Serve static frontend assets when built (for Docker / Hugging Face Spaces)
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(frontendDistPath, 'index.html'));
    }
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 OmniGrowth B2B Intelligence Network Backend running on port ${PORT}`);
});
