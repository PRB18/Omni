import React from 'react';
import { FarmerRecord } from '../types';
import { User, Sprout, Calendar, ShieldAlert, X, Award } from 'lucide-react';

interface FarmerModalProps {
  farmer: FarmerRecord | null;
  onClose: () => void;
}

export const FarmerModal: React.FC<FarmerModalProps> = ({ farmer, onClose }) => {
  if (!farmer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md glass-card rounded-2xl p-6 text-slate-100 shadow-2xl border border-emerald-500/30 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <User className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Farmer Intelligence Record</span>
            <h3 className="font-display font-bold text-xl text-white">{farmer.farmerNameOrAlias}</h3>
          </div>
        </div>

        <div className="space-y-3 bg-slate-900/60 rounded-xl p-4 border border-white/5 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Land Holding
            </span>
            <span className="font-semibold text-white">{farmer.landHoldingAcres} Acres</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-400" /> Farming Experience
            </span>
            <span className="font-semibold text-white">{farmer.yearsOfFarming} Years</span>
          </div>

          <div className="py-1">
            <div className="text-slate-400 flex items-center gap-1.5 mb-2">
              <Sprout className="w-4 h-4 text-emerald-400" /> Crops Grown Currently
            </div>
            <div className="flex flex-wrap gap-1.5">
              {farmer.cropsGrown.map((crop) => (
                <span key={crop} className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                  {crop}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 p-2.5 rounded-xl bg-slate-900/40 border border-slate-800 text-[10px] text-slate-400 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Privacy Protection Active: Farmer names are anonymized/aliased for public demo safety.</span>
        </div>
      </div>
    </div>
  );
};
