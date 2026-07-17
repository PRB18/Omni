import React, { useState, useMemo } from 'react';
import { RegionNode, CropRecord } from '../types';
import { ArrowRight, ShieldCheck, TrendingUp, Droplets, FlaskConical, Store, Users, Calendar, BarChart3, X } from 'lucide-react';

interface HoverCardProps {
  region: RegionNode;
  position: { x: number; y: number };
  onClose: () => void;
  onDrillDown: (region: RegionNode) => void;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  region,
  position,
  onClose,
  onDrillDown
}) => {
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);

  const selectedCrop: CropRecord | undefined = useMemo(() => {
    if (!region.primaryCrops || region.primaryCrops.length === 0) return undefined;
    return region.primaryCrops[selectedCropIndex] || region.primaryCrops[0];
  }, [region.primaryCrops, selectedCropIndex]);

  const cardStyle = useMemo(() => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const cardWidth = 360;
    const cardHeight = 520;

    let left = position.x + 20;
    let top = position.y - 40;

    if (position.x + cardWidth + 40 > screenW) {
      left = Math.max(10, position.x - cardWidth - 20);
    }

    if (position.y + cardHeight > screenH) {
      top = Math.max(20, screenH - cardHeight - 20);
    }

    return {
      left: `${left}px`,
      top: `${top}px`
    };
  }, [position]);

  return (
    <div
      style={cardStyle}
      className="fixed z-50 w-[360px] glass-card rounded-2xl p-4 text-slate-100 shadow-2xl border border-white/15 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
    >
      {/* Header & Close */}
      <div className="flex items-start justify-between border-b border-white/10 pb-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-lg text-white tracking-tight">
              {region.district}
            </h3>
            <span className="text-xs font-semibold text-slate-400">, {region.state}</span>
          </div>

          <div className="mt-1 flex items-center gap-2">
            {region.dataSource === 'real' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-500/30 text-[10px] font-semibold text-blue-300">
                <ShieldCheck className="w-3 h-3" /> Govt Verified Data
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-semibold text-emerald-300">
                <TrendingUp className="w-3 h-3" /> Regional Market Estimate
              </span>
            )}
            <span className="text-[10px] text-slate-500">Updated {new Date(region.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Primary Crops Chip Selector */}
      {region.primaryCrops && region.primaryCrops.length > 0 && (
        <div className="mb-3">
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5 flex items-center gap-1">
            <BarChart3 className="w-3 h-3 text-emerald-400" /> Primary Crops (Top {Math.min(3, region.primaryCrops.length)})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {region.primaryCrops.slice(0, 3).map((crop, idx) => (
              <button
                key={crop.cropName}
                onClick={() => setSelectedCropIndex(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCropIndex === idx
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-white/5'
                }`}
              >
                {crop.cropName}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Crop Details */}
      {selectedCrop && (
        <div className="bg-slate-900/60 rounded-xl p-3 border border-white/5 mb-3 space-y-2">
          <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-emerald-400" /> Season: <strong className="text-white">{selectedCrop.season}</strong>
            </span>
            <span className="text-slate-400">
              Harvest: <strong className="text-emerald-400">{selectedCrop.harvestMonth}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div>
              <div className="text-[10px] text-slate-400">Cropped Area</div>
              <div className="font-semibold text-white">{selectedCrop.areaHectares.toLocaleString()} ha</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Average Yield</div>
              <div className="font-semibold text-emerald-400">{selectedCrop.yieldTonnesPerHectare} t/ha</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Total Production</div>
              <div className="font-semibold text-white">{selectedCrop.totalProductionTonnes.toLocaleString()} tonnes</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400">Active Farmers</div>
              <div className="font-semibold text-white flex items-center gap-1">
                <Users className="w-3 h-3 text-blue-400" /> ~{selectedCrop.farmerCount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Soil Profile */}
      {region.soil && (
        <div className="mb-3 bg-slate-900/40 rounded-xl p-2.5 border border-white/5 text-xs">
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5 flex items-center gap-1">
            <FlaskConical className="w-3 h-3 text-purple-400" /> Soil Profile
          </div>
          <div className="flex items-center justify-between font-medium text-slate-200 mb-1">
            <span>{region.soil.soilType}</span>
            <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px]">
              pH {region.soil.phLevel}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span>N: <strong className="text-slate-200 capitalize">{region.soil.nitrogenLevel}</strong></span>
            <span>•</span>
            <span>P: <strong className="text-slate-200 capitalize">{region.soil.phosphorusLevel}</strong></span>
            <span>•</span>
            <span>K: <strong className="text-slate-200 capitalize">{region.soil.potassiumLevel}</strong></span>
            <span>•</span>
            <span>Org. C: <strong className="text-emerald-300">{region.soil.organicCarbonPercent}%</strong></span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
            <Droplets className="w-3 h-3 text-cyan-400" /> Irrigation: <span className="text-cyan-200 font-medium capitalize">{region.soil.irrigationSource}</span>
          </div>
        </div>
      )}

      {/* Sales Channels / Estimated Mandi Prices */}
      {selectedCrop && selectedCrop.salesChannels && selectedCrop.salesChannels.length > 0 && (
        <div className="mb-3 space-y-1.5">
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1">
            <Store className="w-3 h-3 text-amber-400" /> Mandi Prices & B2B Freight Distribution
          </div>
          {selectedCrop.salesChannels.map((channel) => (
            <div key={channel.name} className="bg-slate-900/50 rounded-lg p-2 border border-slate-800 text-[11px]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-200 truncate max-w-[200px]">{channel.name}</span>
                <span className="font-bold text-amber-400">₹{channel.pricePerQuintal.toLocaleString()}/q</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full"
                    style={{ width: `${channel.percentOfProduce}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-400 font-medium">{channel.percentOfProduce}% volume</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drill-down Button */}
      <button
        onClick={() => onDrillDown(region)}
        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all hover:scale-[1.02]"
      >
        <span>View Commodity Intelligence</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
