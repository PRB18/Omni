import React from 'react';
import { X, Mail, Phone, Building2, ShieldCheck, Truck, Users, Globe2, Sparkles, Sprout, Award } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl glass-card rounded-3xl p-6 md:p-8 text-slate-100 shadow-2xl border border-emerald-500/30 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Logo & Title */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950">
            <Sprout className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-2xl text-white tracking-tight">OMNIGROWTH</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-[10px] uppercase tracking-wider">
                B2B Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Nationwide B2B Agricultural Produce & Logistics Connectivity Network</p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-slate-900/90 to-slate-900/50 rounded-2xl p-5 border border-white/10 mb-6 space-y-3">
          <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-emerald-400" /> Connecting Farms to Enterprises Across India
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            OmniGrowth is a premier nationwide B2B connectivity platform catering to providing agricultural produce from all throughout the nation directly to commercial buyers, food processors, supermarkets, and industrial enterprises across India.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            We streamline bulk agricultural procurement by eliminating opaque middleman layers, guaranteeing transparent market pricing, providing end-to-end quality assurance at the farm gate, and deploying specialized cold-chain freight logistics.
          </p>
        </div>

        {/* Leadership & Founder */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-400" /> Founder & Executive Leadership
          </h4>
          <div className="bg-gradient-to-r from-slate-900/90 via-emerald-950/40 to-slate-900/90 rounded-2xl p-4 border border-emerald-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-display font-extrabold text-emerald-400 text-xl shadow-lg shadow-emerald-950">
              VK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-white">Varshith Krishna</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">Founder & Managing Director</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Pioneering B2B agricultural connectivity, farm-to-enterprise logistics, and transparent commodity pricing networks across India.
              </p>
            </div>
          </div>
        </div>

        {/* Pillars of OmniGrowth */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5 text-center">
            <ShieldCheck className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-xs font-bold text-white">Direct Sourcing</div>
            <div className="text-[10px] text-slate-400">Farm-gate to factory</div>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5 text-center">
            <Truck className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <div className="text-xs font-bold text-white">Pan-India Freight</div>
            <div className="text-[10px] text-slate-400">Cold chain & logistics</div>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5 text-center">
            <Building2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <div className="text-xs font-bold text-white">B2B Contract</div>
            <div className="text-[10px] text-slate-400">Bulk & industry supply</div>
          </div>
        </div>

        {/* Contact Us Bar */}
        <div className="bg-gradient-to-r from-emerald-950/80 to-teal-950/80 rounded-2xl p-4 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-0.5">Get In Touch with OmniGrowth</div>
            <div className="text-[11px] text-slate-300">Ready to fulfill bulk commodity orders or partner with us?</div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:Omnigrowth@gmail.com"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white text-xs font-semibold transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Omnigrowth@gmail.com</span>
            </a>

            <a
              href="tel:9121384735"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold text-xs shadow-lg shadow-emerald-950 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 9121384735</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
