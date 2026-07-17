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

export const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 4.8,
    pitch: 0,
    bearing: 0
  });

  const [regions, setRegions] = useState<RegionNode[]>([]);
  const [farmers, setFarmers] = useState<FarmerRecord[]>([]);
  const [hoveredRegion, setHoveredRegion] = useState<RegionNode | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerRecord | null>(null);
  const [activeChapter, setActiveChapter] = useState<ZoomChapter>('country');
  const [dataSourceFilter, setDataSourceFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Modal Visibility States
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isPartnersOpen, setIsPartnersOpen] = useState<boolean>(false);

  const fetchRegions = useCallback(async (zoom: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/regions?zoom=${zoom}`);
      if (!res.ok) throw new Error('Failed to fetch regions');
      const data: RegionNode[] = await res.json();
      setRegions(data);
    } catch (err) {
      console.error('Error loading regions:', err);
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
      console.error('Error loading farmers:', err);
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
