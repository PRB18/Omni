import React, { useState } from 'react';
import { Search, MapPin, Sprout, ShieldCheck, TrendingUp, Users, Truck, Info } from 'lucide-react';
import { RegionNode } from '../types';

interface HeaderChromeProps {
  allRegions: RegionNode[];
  onSelectRegion: (region: RegionNode) => void;
  dataSourceFilter: string;
  setDataSourceFilter: (filter: string) => void;
  onOpenAbout: () => void;
  onOpenPartners: () => void;
}

export const HeaderChrome: React.FC<HeaderChromeProps> = ({
  allRegions,
  onSelectRegion,
  dataSourceFilter,
  setDataSourceFilter,
  onOpenAbout,
  onOpenPartners
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredRegions = searchQuery.trim() === ''
    ? []
    : allRegions.filter(r =>
        r.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.state.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 pointer-events-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Brand Logo & Company Status */}
        <div className="flex items-center gap-3 glass-card px-4 py-2.5 rounded-2xl pointer-events-auto">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg text-white tracking-tight">OMNIGROWTH</span>
              <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                PAN-INDIA B2B
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Nationwide Commodity Intelligence & Supply Chain</p>
          </div>
        </div>

        {/* Center: District Search Bar */}
        <div className="relative w-full md:w-80 pointer-events-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search district or state (e.g. Srinagar, Nalgonda)..."
              className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-xl bg-slate-900/80 text-white placeholder-slate-400 border border-slate-700/60 focus:outline-none focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 backdrop-blur-md transition-all"
            />
          </div>

          {/* Dropdown search results */}
          {isOpen && filteredRegions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-xl glass-card border border-slate-700/80 shadow-2xl z-50">
              {filteredRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => {
                    onSelectRegion(region);
                    setSearchQuery('');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-emerald-500/10 transition-colors border-b border-slate-800/60 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">{region.district}</div>
                      <div className="text-[10px] text-slate-400">{region.state}</div>
                    </div>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                    region.dataSource === 'real' ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {region.dataSource === 'real' ? 'GOVT VERIFIED' : 'MARKET ESTIMATE'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Navigation Links & Data Filter */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* About Us Button */}
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-pill text-xs font-semibold text-slate-200 hover:text-white hover:border-emerald-500/40 transition-all"
          >
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span>About Us</span>
          </button>

          {/* Logistics Partners Button */}
          <button
            onClick={onOpenPartners}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-pill text-xs font-semibold text-slate-200 hover:text-white hover:border-blue-500/40 transition-all"
          >
            <Truck className="w-3.5 h-3.5 text-blue-400" />
            <span>Logistics</span>
          </button>

          {/* Filter Pill */}
          <div className="flex items-center glass-pill p-1 rounded-xl text-xs">
            <button
              onClick={() => setDataSourceFilter('all')}
              className={`px-2 py-1 rounded-lg transition-all ${
                dataSourceFilter === 'all' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDataSourceFilter('real')}
              className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
                dataSourceFilter === 'real' ? 'bg-blue-500/20 text-blue-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3 h-3" /> Govt Data
            </button>
            <button
              onClick={() => setDataSourceFilter('market_estimated')}
              className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
                dataSourceFilter === 'market_estimated' ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3 h-3" /> Market Estimated
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
