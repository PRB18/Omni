import React, { useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import Map from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import { RegionNode, FarmerRecord, ViewState } from '../types';

interface MapCanvasProps {
  viewState: ViewState;
  onViewStateChange: (nextViewState: ViewState) => void;
  regions: RegionNode[];
  farmers: FarmerRecord[];
  hoveredRegion: RegionNode | null;
  onHoverRegion: (region: RegionNode | null, pos?: { x: number; y: number }) => void;
  onSelectFarmer: (farmer: FarmerRecord) => void;
}

function getCropColor(cropName?: string): [number, number, number] {
  if (!cropName) return [212, 160, 23];
  const lower = cropName.toLowerCase();

  // Premium Spices & Saffron
  if (lower.includes('saffron') || lower.includes('kesar')) return [231, 76, 60]; // Kashmiri saffron red
  if (lower.includes('chili') || lower.includes('pepper') || lower.includes('spice') || lower.includes('turmeric')) return [211, 84, 0]; // Terracotta
  if (lower.includes('cumin') || lower.includes('jeera') || lower.includes('mustard')) return [243, 156, 18]; // Jeera orange

  // Tea, Coffee & Plantation
  if (lower.includes('tea') || lower.includes('coffee') || lower.includes('makhana')) return [39, 174, 96]; // Plantation emerald green

  // Fruits
  if (lower.includes('apple') || lower.includes('mango') || lower.includes('grapes') || lower.includes('pomegranate') || lower.includes('sweet lime') || lower.includes('banana')) return [230, 126, 34]; // Warm fruit orange

  // Cereals
  if (lower.includes('rice') || lower.includes('wheat') || lower.includes('maize') || lower.includes('paddy') || lower.includes('grain') || lower.includes('basmati')) return [241, 196, 15]; // Warm gold

  // Cash Crops
  if (lower.includes('cotton') || lower.includes('groundnut') || lower.includes('onion') || lower.includes('tobacco') || lower.includes('sugarcane') || lower.includes('mentha')) return [46, 204, 113]; // Bright emerald

  return [26, 188, 156]; // Turquoise teal
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  viewState,
  onViewStateChange,
  regions,
  farmers,
  hoveredRegion,
  onHoverRegion,
  onSelectFarmer
}) => {

  const layers = useMemo(() => {
    // 1. Regional Area Coverage Layer (covers the district area in translucent crop color)
    const areaCoverageLayer = new ScatterplotLayer({
      id: 'district-area-coverage',
      data: regions,
      pickable: true,
      opacity: 0.35,
      stroked: true,
      filled: true,
      radiusScale: 1,
      radiusMinPixels: 25,
      radiusMaxPixels: 120,
      lineWidthMinPixels: 1,
      lineWidthMaxPixels: 3,
      getPosition: (d: RegionNode) => [d.lng, d.lat],
      getRadius: (d: RegionNode) => {
        if (viewState.zoom < 6) return 55000;
        if (viewState.zoom < 9) return 30000;
        return 12000;
      },
      getFillColor: (d: RegionNode) => {
        const primaryCrop = d.primaryCrops && d.primaryCrops[0]?.cropName;
        const color = getCropColor(primaryCrop);
        if (hoveredRegion && hoveredRegion.id === d.id) {
          return [...color, 160];
        }
        return [...color, 75]; // Soft translucent area fill
      },
      getLineColor: (d: RegionNode) => {
        const primaryCrop = d.primaryCrops && d.primaryCrops[0]?.cropName;
        const color = getCropColor(primaryCrop);
        if (hoveredRegion && hoveredRegion.id === d.id) {
          return [255, 255, 255, 255];
        }
        return [...color, 180];
      },
      onHover: (info) => {
        if (info.object) {
          onHoverRegion(info.object as RegionNode, { x: info.x, y: info.y });
        } else {
          onHoverRegion(null);
        }
      },
      updateTriggers: {
        getFillColor: [hoveredRegion?.id],
        getLineColor: [hoveredRegion?.id],
        getRadius: [viewState.zoom]
      }
    });

    // 2. Glowing Core Pinpoint Orbs Layer (Pulsing pinpoint center node)
    const pinpointLayer = new ScatterplotLayer({
      id: 'district-pinpoint-nodes',
      data: regions,
      pickable: true,
      opacity: 0.95,
      stroked: true,
      filled: true,
      radiusScale: 1,
      radiusMinPixels: 6,
      radiusMaxPixels: 18,
      lineWidthMinPixels: 2,
      lineWidthMaxPixels: 4,
      getPosition: (d: RegionNode) => [d.lng, d.lat],
      getRadius: (d: RegionNode) => {
        if (viewState.zoom < 6) return 8000;
        if (viewState.zoom < 9) return 4000;
        return 1500;
      },
      getFillColor: (d: RegionNode) => {
        const primaryCrop = d.primaryCrops && d.primaryCrops[0]?.cropName;
        const color = getCropColor(primaryCrop);
        if (hoveredRegion && hoveredRegion.id === d.id) {
          return [255, 255, 255, 255]; // Bright white on hover
        }
        return [...color, 255];
      },
      getLineColor: (d: RegionNode) => {
        if (hoveredRegion && hoveredRegion.id === d.id) {
          return [16, 185, 129, 255];
        }
        return [255, 255, 255, 220]; // Crisp white outer ring
      },
      onHover: (info) => {
        if (info.object) {
          onHoverRegion(info.object as RegionNode, { x: info.x, y: info.y });
        } else {
          onHoverRegion(null);
        }
      },
      updateTriggers: {
        getFillColor: [hoveredRegion?.id],
        getLineColor: [hoveredRegion?.id]
      }
    });

    // 3. Hyper-Local Farmer Pins at high zoom (Zoom >= 11.5)
    const farmerLayer = viewState.zoom >= 11.5 ? new ScatterplotLayer({
      id: 'farmer-pins',
      data: farmers,
      pickable: true,
      opacity: 0.95,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 5,
      radiusMaxPixels: 12,
      lineWidthMinPixels: 1.5,
      getPosition: (f: FarmerRecord, { index }) => {
        const parent = regions.find(r => r.id === f.regionId);
        const latOffset = ((index % 5) - 2) * 0.015;
        const lngOffset = (Math.floor(index / 5) - 2) * 0.015;
        return parent ? [parent.lng + lngOffset, parent.lat + latOffset] : [78.5, 17.5];
      },
      getFillColor: [46, 204, 113, 240],
      getLineColor: [255, 255, 255, 255],
      onClick: (info) => {
        if (info.object) {
          onSelectFarmer(info.object as FarmerRecord);
        }
      }
    }) : null;

    return [areaCoverageLayer, pinpointLayer, farmerLayer].filter(Boolean);
  }, [regions, farmers, viewState.zoom, hoveredRegion, onHoverRegion, onSelectFarmer]);

  return (
    <div className="relative w-full h-screen">
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e) => onViewStateChange(e.viewState as ViewState)}
        controller={{ doubleClickZoom: true, dragRotate: true }}
        layers={layers}
      >
        <Map
          mapLib={maplibregl as any}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          reuseMaps
        />
      </DeckGL>
    </div>
  );
};
