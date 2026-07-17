import { DatabaseSync } from 'node:sqlite';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'database.sqlite');
export const db = new DatabaseSync(dbPath);

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS regions (
      id TEXT PRIMARY KEY,
      state TEXT NOT NULL,
      district TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      primary_crops TEXT NOT NULL,
      soil TEXT NOT NULL,
      data_source TEXT NOT NULL,
      last_updated TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS farmers (
      id TEXT PRIMARY KEY,
      region_id TEXT NOT NULL,
      farmer_name_or_alias TEXT NOT NULL,
      land_holding_acres REAL NOT NULL,
      crops_grown TEXT NOT NULL,
      years_of_farming INTEGER NOT NULL,
      FOREIGN KEY (region_id) REFERENCES regions(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_regions_coords ON regions (lat, lng);
    CREATE INDEX IF NOT EXISTS idx_farmers_region ON farmers (region_id);
  `);
}

export interface RegionRow {
  id: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  primary_crops: string;
  soil: string;
  data_source: 'real' | 'market_estimated' | 'hybrid';
  last_updated: string;
}

export interface FarmerRow {
  id: string;
  region_id: string;
  farmer_name_or_alias: string;
  land_holding_acres: number;
  crops_grown: string;
  years_of_farming: number;
}
