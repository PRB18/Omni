import React from 'react';
import { X, Truck, ShieldCheck, Thermometer, MapPin, Navigation, Award, CheckCircle2 } from 'lucide-react';

interface PartnersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PartnerItem {
  name: string;
  category: string;
  fleetType: string;
  reach: string;
  badge: string;
}

export const PartnersModal: React.FC<PartnersModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const partners: PartnerItem[] = [
    {
      name: 'Pan-India Heavy FTL Freight Network',
      category: 'Full Truckload & Bulk Commodity Distribution',
      fleetType: 'Heavy 32ft Multi-Axle Vehicles',
      reach: '28 States & 18,000+ Pincodes',
      badge: 'Tier-1 Logistics'
    },
    {
      name: 'Express Highway Relay Fleet',
      category: 'Express Transit & Perishable Goods',
      fleetType: 'Driver-Relay Express Commercial Trucks',
      reach: '48-Hour Cross-Country Corridor',
      badge: 'Express Freight'
    },
    {
      name: 'Multimodal Container Rail Freight',
      category: 'Bulk Long-Haul Grain & Dry Cargo',
      fleetType: 'ISO Heavy Rail Cargo Containers',
      reach: 'Inland Terminals & Port Corridors',
      badge: 'Rail Freight'
    },
    {
      name: 'Active Reefer Cold-Chain Fleet',
      category: 'Perishable Produce & Horticulture',
      fleetType: '0°C to 8°C Temperature-Controlled Reefer Vans',
      reach: 'Fresh Farm-to-Retail Network',
      badge: 'Cold Chain Lead'
    },
    {
      name: 'Interstate APMC Mandi Hub Freight',
      category: 'Regional Mandi-to-Warehouse Feeder',
      fleetType: 'Medium & Light Commercial Vehicles',
      reach: '500+ APMC Market Yards',
      badge: 'Mandi Network'
    },
    {
      name: 'Port & Ocean Export Freight Network',
      category: 'International Export & Maritime Shipping',
      fleetType: 'Controlled Atmosphere Export Containers',
      reach: 'Middle East, EU & SE Asia Ports',
      badge: 'Global Export'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-3xl glass-card rounded-3xl p-6 md:p-8 text-slate-100 shadow-2xl border border-blue-500/30 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-950">
            <Truck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-2xl text-white tracking-tight">LOGISTICS & FREIGHT NETWORK</h3>
            </div>
            <p className="text-xs text-slate-400 font-medium">Integrated Pan-India Supply Chain, Cold-Chain Reefer & Multimodal Network</p>
          </div>
        </div>

        {/* Performance Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
            <div className="font-display font-bold text-lg text-emerald-400">99.4%</div>
            <div className="text-[10px] text-slate-400">On-Time B2B Delivery</div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
            <div className="font-display font-bold text-lg text-blue-400">28 States</div>
            <div className="text-[10px] text-slate-400">Pan-India Coverage</div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
            <div className="font-display font-bold text-lg text-purple-400">0°C - 8°C</div>
            <div className="text-[10px] text-slate-400">Reefer Cold Chain</div>
          </div>

          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-center">
            <div className="font-display font-bold text-lg text-amber-400">Real-time</div>
            <div className="text-[10px] text-slate-400">GPS Fleet Telematics</div>
          </div>
        </div>

        {/* Capability Network Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-slate-900/50 rounded-2xl p-4 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-display font-bold text-sm text-white">{partner.name}</h4>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-semibold">
                    {partner.badge}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{partner.category}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{partner.fleetType}</span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{partner.reach}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Guarantee */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/70 to-slate-900/90 border border-blue-500/30 flex items-center gap-3 text-xs text-slate-300">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <span>OmniGrowth manages all E-Way bills, APMC mandi cess documentation, interstate border permits, and transit insurance for complete hassle-free bulk delivery.</span>
        </div>

      </div>
    </div>
  );
};
