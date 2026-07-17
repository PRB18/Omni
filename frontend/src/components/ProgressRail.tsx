import React from 'react';
import { ZoomChapter } from '../types';
import { Globe, Map, Building2, Home } from 'lucide-react';

interface ProgressRailProps {
  currentZoom: number;
  activeChapter: ZoomChapter;
  onSelectChapter: (chapter: ZoomChapter) => void;
}

export const ProgressRail: React.FC<ProgressRailProps> = ({
  currentZoom,
  activeChapter,
  onSelectChapter
}) => {
  const chapters: { id: ZoomChapter; label: string; minZoom: number; maxZoom: number; icon: React.ReactNode }[] = [
    { id: 'country', label: 'Country', minZoom: 4, maxZoom: 5, icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'state', label: 'State', minZoom: 6, maxZoom: 8, icon: <Map className="w-3.5 h-3.5" /> },
    { id: 'district', label: 'District', minZoom: 9, maxZoom: 11, icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'village', label: 'Village', minZoom: 12, maxZoom: 16, icon: <Home className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      <div className="glass-card p-2 rounded-2xl flex flex-col gap-2 shadow-2xl border border-white/10">
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 text-center px-1 py-0.5 border-b border-slate-800">
          Zoom Level
        </div>

        {chapters.map((ch) => {
          const isActive = activeChapter === ch.id;

          return (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className={`group relative flex items-center justify-end gap-2.5 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {/* Tooltip Label */}
              <span className="font-display font-semibold text-xs transition-opacity">
                {ch.label}
              </span>

              {/* Icon / Indicator Dot */}
              <div
                className={`flex items-center justify-center w-6 h-6 rounded-lg transition-transform ${
                  isActive ? 'bg-emerald-500 text-slate-950 font-bold scale-110' : 'bg-slate-800/80 group-hover:scale-105'
                }`}
              >
                {ch.icon}
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Zoom Level Gauge */}
      <div className="glass-pill px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-400 tracking-wider">
        ZOOM: <span className="text-emerald-400 font-mono text-xs">{currentZoom.toFixed(1)}</span>
      </div>
    </div>
  );
};
