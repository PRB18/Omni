export interface SalesChannel {
  type: 'wholesale_mandi' | 'retail_direct' | 'export' | 'cooperative' | 'online_platform';
  name: string;
  pricePerQuintal: number;
  percentOfProduce: number;
}

export interface CropRecord {
  cropName: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  areaHectares: number;
  yieldTonnesPerHectare: number;
  totalProductionTonnes: number;
  harvestMonth: string;
  farmerCount: number;
  salesChannels: SalesChannel[];
}

export interface SoilProfile {
  soilType: string;
  phLevel: number;
  nitrogenLevel: 'low' | 'medium' | 'high';
  phosphorusLevel: 'low' | 'medium' | 'high';
  potassiumLevel: 'low' | 'medium' | 'high';
  organicCarbonPercent: number;
  irrigationSource: 'canal' | 'borewell' | 'rainfed' | 'tank' | 'mixed';
}

export interface RegionNode {
  id: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  boundaryGeoJSON?: any;
  primaryCrops: CropRecord[];
  soil: SoilProfile;
  dataSource: 'real' | 'market_estimated' | 'hybrid';
  lastUpdated: string;
  totalProductionTonnes?: number;
  nodeCount?: number;
}

export interface FarmerRecord {
  id: string;
  regionId: string;
  farmerNameOrAlias: string;
  landHoldingAcres: number;
  cropsGrown: string[];
  yearsOfFarming: number;
}

export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

export type ZoomChapter = 'country' | 'state' | 'district' | 'village';
