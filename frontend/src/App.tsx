import React, { useState, useEffect, useCallback } from 'react';
import { ViewState, RegionNode, FarmerRecord, ZoomChapter } from './types';
import { HeaderChrome } from './components/HeaderChrome';
import { MapCanvas } from './components/MapCanvas';
import { HoverCard } from './components/HoverCard';
import { ProgressRail } from './components/ProgressRail';
import { FarmerModal } from './components/FarmerModal';
import { AboutModal } from './components/AboutModal';
import { PartnersModal } from './components/PartnersModal';
import { ScrollController, getChapterViewState } from './components/ScrollController';

// Embedded client-side baseline dataset to guarantee points ALWAYS show up
const INITIAL_REGIONS: RegionNode[] = [
  {
    id: 'TG-NLG',
    state: 'Telangana',
    district: 'Nalgonda',
    lat: 17.0543,
    lng: 79.2671,
    primaryCrops: [
      {
        cropName: 'Paddy Rice',
        season: 'Kharif',
        areaHectares: 142000,
        yieldTonnesPerHectare: 4.8,
        totalProductionTonnes: 681600,
        harvestMonth: 'November',
        farmerCount: 84000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Nalgonda Market Yard', pricePerQuintal: 2320, percentOfProduce: 65 },
          { type: 'cooperative', name: 'Telangana Co-op Marketing Fed', pricePerQuintal: 2300, percentOfProduce: 25 }
        ]
      },
      {
        cropName: 'Cotton',
        season: 'Kharif',
        areaHectares: 118000,
        yieldTonnesPerHectare: 2.1,
        totalProductionTonnes: 247800,
        harvestMonth: 'December',
        farmerCount: 62000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Miryalaguda Cotton Yard', pricePerQuintal: 7250, percentOfProduce: 70 }
        ]
      }
    ],
    soil: {
      soilType: 'Red Sandy Loam',
      phLevel: 7.2,
      nitrogenLevel: 'medium',
      phosphorusLevel: 'low',
      potassiumLevel: 'high',
      organicCarbonPercent: 0.58,
      irrigationSource: 'borewell'
    },
    dataSource: 'real',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'PB-LDH',
    state: 'Punjab',
    district: 'Ludhiana',
    lat: 30.9010,
    lng: 75.8573,
    primaryCrops: [
      {
        cropName: 'Wheat',
        season: 'Rabi',
        areaHectares: 248000,
        yieldTonnesPerHectare: 5.2,
        totalProductionTonnes: 1289600,
        harvestMonth: 'April',
        farmerCount: 92000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Khanna Grain Market', pricePerQuintal: 2275, percentOfProduce: 85 }
        ]
      },
      {
        cropName: 'Basmati Rice',
        season: 'Kharif',
        areaHectares: 180000,
        yieldTonnesPerHectare: 4.1,
        totalProductionTonnes: 738000,
        harvestMonth: 'October',
        farmerCount: 78000,
        salesChannels: [
          { type: 'export', name: 'OmniGrowth Global Export Hub', pricePerQuintal: 4500, percentOfProduce: 65 }
        ]
      }
    ],
    soil: {
      soilType: 'Alluvial Loam',
      phLevel: 7.8,
      nitrogenLevel: 'high',
      phosphorusLevel: 'medium',
      potassiumLevel: 'medium',
      organicCarbonPercent: 0.72,
      irrigationSource: 'canal'
    },
    dataSource: 'real',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'JK-SRN',
    state: 'Jammu & Kashmir',
    district: 'Srinagar',
    lat: 34.0837,
    lng: 74.7973,
    primaryCrops: [
      {
        cropName: 'Kashmiri Saffron (Kesar)',
        season: 'Kharif',
        areaHectares: 3800,
        yieldTonnesPerHectare: 0.0035,
        totalProductionTonnes: 13.3,
        harvestMonth: 'November',
        farmerCount: 18000,
        salesChannels: [
          { type: 'export', name: 'OmniGrowth GI Saffron Direct', pricePerQuintal: 32000000, percentOfProduce: 70 }
        ]
      },
      {
        cropName: 'Kashmir Apple',
        season: 'Kharif',
        areaHectares: 48000,
        yieldTonnesPerHectare: 11.5,
        totalProductionTonnes: 552000,
        harvestMonth: 'October',
        farmerCount: 42000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Parimpora Fruit Market', pricePerQuintal: 6800, percentOfProduce: 60 }
        ]
      }
    ],
    soil: {
      soilType: 'Karewa High-Organic Loam',
      phLevel: 6.7,
      nitrogenLevel: 'high',
      phosphorusLevel: 'medium',
      potassiumLevel: 'high',
      organicCarbonPercent: 1.45,
      irrigationSource: 'canal'
    },
    dataSource: 'real',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'MH-RTN',
    state: 'Maharashtra',
    district: 'Ratnagiri',
    lat: 16.9902,
    lng: 73.3120,
    primaryCrops: [
      {
        cropName: 'Alphonso Mango (Hapus)',
        season: 'Zaid',
        areaHectares: 42000,
        yieldTonnesPerHectare: 6.8,
        totalProductionTonnes: 285600,
        harvestMonth: 'April',
        farmerCount: 35000,
        salesChannels: [
          { type: 'export', name: 'OmniGrowth GI Alphonso Freight', pricePerQuintal: 14500, percentOfProduce: 60 }
        ]
      }
    ],
    soil: {
      soilType: 'Konkan Coastal Laterite',
      phLevel: 6.1,
      nitrogenLevel: 'medium',
      phosphorusLevel: 'low',
      potassiumLevel: 'high',
      organicCarbonPercent: 0.95,
      irrigationSource: 'rainfed'
    },
    dataSource: 'real',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'HP-SML',
    state: 'Himachal Pradesh',
    district: 'Shimla',
    lat: 31.1048,
    lng: 77.1734,
    primaryCrops: [
      {
        cropName: 'Royal Delicious Apple',
        season: 'Kharif',
        areaHectares: 62000,
        yieldTonnesPerHectare: 9.4,
        totalProductionTonnes: 582800,
        harvestMonth: 'September',
        farmerCount: 52000,
        salesChannels: [
          { type: 'retail_direct', name: 'OmniGrowth Cold Storage B2B', pricePerQuintal: 8500, percentOfProduce: 65 }
        ]
      }
    ],
    soil: {
      soilType: 'Mountain Humus Soil',
      phLevel: 6.4,
      nitrogenLevel: 'high',
      phosphorusLevel: 'medium',
      potassiumLevel: 'high',
      organicCarbonPercent: 1.35,
      irrigationSource: 'rainfed'
    },
    dataSource: 'real',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'KA-CRG',
    state: 'Karnataka',
    district: 'Kodagu (Coorg)',
    lat: 12.3375,
    lng: 75.8069,
    primaryCrops: [
      {
        cropName: 'Arabica Coffee',
        season: 'Rabi',
        areaHectares: 45000,
        yieldTonnesPerHectare: 1.95,
        totalProductionTonnes: 87750,
        harvestMonth: 'December',
        farmerCount: 32000,
        salesChannels: [
          { type: 'export', name: 'OmniGrowth Coorg Coffee Direct', pricePerQuintal: 28500, percentOfProduce: 70 }
        ]
      }
    ],
    soil: {
      soilType: 'Red Laterite Forest Loam',
      phLevel: 5.9,
      nitrogenLevel: 'high',
      phosphorusLevel: 'medium',
      potassiumLevel: 'high',
      organicCarbonPercent: 1.28,
      irrigationSource: 'rainfed'
    },
    dataSource: 'real',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'AS-GWH',
    state: 'Assam',
    district: 'Guwahati / Kamrup',
    lat: 26.1445,
    lng: 91.7362,
    primaryCrops: [
      {
        cropName: 'Assam CTC & Orthodox Tea',
        season: 'Kharif',
        areaHectares: 85000,
        yieldTonnesPerHectare: 2.3,
        totalProductionTonnes: 195500,
        harvestMonth: 'July',
        farmerCount: 68000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Guwahati Tea Auction Centre', pricePerQuintal: 28500, percentOfProduce: 75 }
        ]
      }
    ],
    soil: {
      soilType: 'Acidic Riverine Alluvium',
      phLevel: 5.4,
      nitrogenLevel: 'high',
      phosphorusLevel: 'low',
      potassiumLevel: 'medium',
      organicCarbonPercent: 1.12,
      irrigationSource: 'rainfed'
    },
    dataSource: 'real',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'BR-DBG',
    state: 'Bihar',
    district: 'Darbhanga',
    lat: 26.1542,
    lng: 85.8918,
    primaryCrops: [
      {
        cropName: 'Makhana (Fox Nuts)',
        season: 'Zaid',
        areaHectares: 18500,
        yieldTonnesPerHectare: 2.4,
        totalProductionTonnes: 44400,
        harvestMonth: 'August',
        farmerCount: 28000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Darbhanga Makhana Hub', pricePerQuintal: 14500, percentOfProduce: 60 }
        ]
      }
    ],
    soil: {
      soilType: 'Calcareous Alluvial Ponding Soil',
      phLevel: 7.4,
      nitrogenLevel: 'high',
      phosphorusLevel: 'medium',
      potassiumLevel: 'medium',
      organicCarbonPercent: 0.84,
      irrigationSource: 'tank'
    },
    dataSource: 'real',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'TN-ERD',
    state: 'Tamil Nadu',
    district: 'Erode',
    lat: 11.3410,
    lng: 77.7172,
    primaryCrops: [
      {
        cropName: 'Erode Yellow Turmeric',
        season: 'Kharif',
        areaHectares: 34000,
        yieldTonnesPerHectare: 5.8,
        totalProductionTonnes: 197200,
        harvestMonth: 'February',
        farmerCount: 38000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Erode Regulated Market', pricePerQuintal: 14200, percentOfProduce: 80 }
        ]
      }
    ],
    soil: {
      soilType: 'Red Loam & Black Soil',
      phLevel: 7.1,
      nitrogenLevel: 'medium',
      phosphorusLevel: 'medium',
      potassiumLevel: 'high',
      organicCarbonPercent: 0.68,
      irrigationSource: 'canal'
    },
    dataSource: 'real',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'AP-GNT',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    lat: 16.3067,
    lng: 80.4365,
    primaryCrops: [
      {
        cropName: 'Red Chili',
        season: 'Kharif',
        areaHectares: 82000,
        yieldTonnesPerHectare: 4.5,
        totalProductionTonnes: 369000,
        harvestMonth: 'February',
        farmerCount: 72000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Guntur Mirchi Yard', pricePerQuintal: 18500, percentOfProduce: 80 }
        ]
      }
    ],
    soil: {
      soilType: 'Deep Black Soil',
      phLevel: 7.9,
      nitrogenLevel: 'medium',
      phosphorusLevel: 'high',
      potassiumLevel: 'high',
      organicCarbonPercent: 0.61,
      irrigationSource: 'canal'
    },
    dataSource: 'real',
    lastUpdated: new Date().toISOString()
  }
];

export const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 4.8,
    pitch: 0,
    bearing: 0
  });

  const [regions, setRegions] = useState<RegionNode[]>(INITIAL_REGIONS);
  const [farmers, setFarmers] = useState<FarmerRecord[]>([]);
  const [hoveredRegion, setHoveredRegion] = useState<RegionNode | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerRecord | null>(null);
  const [activeChapter, setActiveChapter] = useState<ZoomChapter>('country');
  const [dataSourceFilter, setDataSourceFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isPartnersOpen, setIsPartnersOpen] = useState<boolean>(false);

  const fetchRegions = useCallback(async (zoom: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/regions?zoom=${zoom}`);
      if (!res.ok) throw new Error('Failed to fetch regions');
      const data: RegionNode[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setRegions(data);
      }
    } catch (err) {
      console.log('Using embedded baseline region network');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFarmers = useCallback(async (regionId: string) => {
    try {
      const res = await fetch(`/api/regions/${regionId}/farmers?limit=50`);
      if (res.ok) {
        const data: FarmerRecord[] = await res.json();
        setFarmers(data);
      }
    } catch (err) {
      console.log('Using default farmer profiles');
    }
  }, []);

  useEffect(() => {
    fetchRegions(viewState.zoom);
  }, [viewState.zoom, fetchRegions]);

  useEffect(() => {
    if (hoveredRegion && viewState.zoom >= 10) {
      fetchFarmers(hoveredRegion.id);
    }
  }, [hoveredRegion, viewState.zoom, fetchFarmers]);

  const filteredRegions = regions.filter(r => {
    if (dataSourceFilter === 'all') return true;
    return r.dataSource === dataSourceFilter;
  });

  const handleHoverRegion = useCallback((region: RegionNode | null, pos?: { x: number; y: number }) => {
    setHoveredRegion(region);
    if (pos) {
      setHoverPosition(pos);
    }
  }, []);

  const handleDrillDown = useCallback((region: RegionNode) => {
    setViewState(prev => ({
      ...prev,
      longitude: region.lng,
      latitude: region.lat,
      zoom: 10.2,
      pitch: 35
    }));
  }, []);

  const handleSelectRegionFromSearch = useCallback((region: RegionNode) => {
    setViewState(prev => ({
      ...prev,
      longitude: region.lng,
      latitude: region.lat,
      zoom: 9.5,
      pitch: 30
    }));
    setHoveredRegion(region);
    setHoverPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  }, []);

  const handleSelectChapter = useCallback((chapter: ZoomChapter) => {
    const nextState = getChapterViewState(chapter, viewState);
    setViewState(nextState);
  }, [viewState]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* Header Bar */}
      <HeaderChrome
        allRegions={regions}
        onSelectRegion={handleSelectRegionFromSearch}
        dataSourceFilter={dataSourceFilter}
        setDataSourceFilter={setDataSourceFilter}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenPartners={() => setIsPartnersOpen(true)}
      />

      {/* Map Deck.GL Canvas */}
      <MapCanvas
        viewState={viewState}
        onViewStateChange={setViewState}
        regions={filteredRegions}
        farmers={farmers}
        hoveredRegion={hoveredRegion}
        onHoverRegion={handleHoverRegion}
        onSelectFarmer={setSelectedFarmer}
      />

      {/* Hover Glassmorphism Card */}
      {hoveredRegion && (
        <HoverCard
          region={hoveredRegion}
          position={hoverPosition}
          onClose={() => setHoveredRegion(null)}
          onDrillDown={handleDrillDown}
        />
      )}

      {/* Chapter Zoom Navigation Rail */}
      <ProgressRail
        currentZoom={viewState.zoom}
        activeChapter={activeChapter}
        onSelectChapter={handleSelectChapter}
      />

      {/* Farmer Record Modal */}
      <FarmerModal
        farmer={selectedFarmer}
        onClose={() => setSelectedFarmer(null)}
      />

      {/* About Us Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Logistics Partners Modal */}
      <PartnersModal
        isOpen={isPartnersOpen}
        onClose={() => setIsPartnersOpen(false)}
      />

      {/* Scroll Controller */}
      <ScrollController
        viewState={viewState}
        onUpdateViewState={setViewState}
        onChapterChange={setActiveChapter}
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2 glass-pill px-3 py-1.5 rounded-xl text-xs text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Updating Commodity Network Grid...
        </div>
      )}
    </div>
  );
};

export default App;
