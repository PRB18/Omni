import { db, initDb } from './db.js';

interface SeedRegion {
  id: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  primaryCrops: {
    cropName: string;
    season: 'Kharif' | 'Rabi' | 'Zaid';
    areaHectares: number;
    yieldTonnesPerHectare: number;
    totalProductionTonnes: number;
    harvestMonth: string;
    farmerCount: number;
    salesChannels: {
      type: 'wholesale_mandi' | 'retail_direct' | 'export' | 'cooperative' | 'online_platform';
      name: string;
      pricePerQuintal: number;
      percentOfProduce: number;
    }[];
  }[];
  soil: {
    soilType: string;
    phLevel: number;
    nitrogenLevel: 'low' | 'medium' | 'high';
    phosphorusLevel: 'low' | 'medium' | 'high';
    potassiumLevel: 'low' | 'medium' | 'high';
    organicCarbonPercent: number;
    irrigationSource: 'canal' | 'borewell' | 'rainfed' | 'tank' | 'mixed';
  };
  farmers: {
    id: string;
    farmerNameOrAlias: string;
    landHoldingAcres: number;
    cropsGrown: string[];
    yearsOfFarming: number;
  }[];
}

const seedRegions: SeedRegion[] = [
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
          { type: 'cooperative', name: 'Telangana Co-op Marketing Fed', pricePerQuintal: 2300, percentOfProduce: 25 },
          { type: 'retail_direct', name: 'OmniGrowth Enterprise Direct', pricePerQuintal: 2480, percentOfProduce: 10 }
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
      },
      {
        cropName: 'Sweet Lime (Mosambi)',
        season: 'Zaid',
        areaHectares: 24000,
        yieldTonnesPerHectare: 12.5,
        totalProductionTonnes: 300000,
        harvestMonth: 'August',
        farmerCount: 14000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Gaddiannaram Fruit Market', pricePerQuintal: 4200, percentOfProduce: 55 },
          { type: 'retail_direct', name: 'OmniGrowth B2B Logistics', pricePerQuintal: 5200, percentOfProduce: 45 }
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
    farmers: [
      { id: 'F-TG-01', farmerNameOrAlias: 'Ramesh Reddy K.', landHoldingAcres: 4.5, cropsGrown: ['Paddy Rice', 'Cotton'], yearsOfFarming: 18 }
    ]
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
    farmers: [
      { id: 'F-PB-01', farmerNameOrAlias: 'Gurpreet Singh', landHoldingAcres: 12.5, cropsGrown: ['Wheat', 'Basmati Rice'], yearsOfFarming: 22 }
    ]
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
          { type: 'export', name: 'OmniGrowth GI Alphonso Air Freight', pricePerQuintal: 14500, percentOfProduce: 60 },
          { type: 'wholesale_mandi', name: 'Ratnagiri APMC Yard', pricePerQuintal: 11200, percentOfProduce: 40 }
        ]
      },
      {
        cropName: 'Cashew Nut (Kaju)',
        season: 'Rabi',
        areaHectares: 58000,
        yieldTonnesPerHectare: 1.8,
        totalProductionTonnes: 104400,
        harvestMonth: 'March',
        farmerCount: 28000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Vengurla Cashew Processing Platform', pricePerQuintal: 12800, percentOfProduce: 75 }
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
    farmers: [
      { id: 'F-MH-02', farmerNameOrAlias: 'Mangesh Sawant', landHoldingAcres: 5.5, cropsGrown: ['Alphonso Mango', 'Cashew Nut'], yearsOfFarming: 24 }
    ]
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
          { type: 'retail_direct', name: 'OmniGrowth Cold Storage B2B', pricePerQuintal: 8500, percentOfProduce: 65 },
          { type: 'wholesale_mandi', name: 'Dhalli Fruit Mandi', pricePerQuintal: 7200, percentOfProduce: 35 }
        ]
      },
      {
        cropName: 'Himachali Wild Honey & Walnuts',
        season: 'Rabi',
        areaHectares: 12000,
        yieldTonnesPerHectare: 1.4,
        totalProductionTonnes: 16800,
        harvestMonth: 'October',
        farmerCount: 15000,
        salesChannels: [
          { type: 'export', name: 'OmniGrowth High-Altitude Gourmet Direct', pricePerQuintal: 42000, percentOfProduce: 70 }
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
    farmers: [
      { id: 'F-HP-01', farmerNameOrAlias: 'Devender Sharma', landHoldingAcres: 4.0, cropsGrown: ['Royal Apple', 'Walnuts'], yearsOfFarming: 26 }
    ]
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
          { type: 'export', name: 'OmniGrowth Coorg Coffee Direct Export', pricePerQuintal: 28500, percentOfProduce: 70 },
          { type: 'wholesale_mandi', name: 'Madikeri Coffee Auction', pricePerQuintal: 25200, percentOfProduce: 30 }
        ]
      },
      {
        cropName: 'Green Cardamom (Elaichi)',
        season: 'Kharif',
        areaHectares: 18000,
        yieldTonnesPerHectare: 0.45,
        totalProductionTonnes: 8100,
        harvestMonth: 'October',
        farmerCount: 16000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Spices Board Auction Yard', pricePerQuintal: 185000, percentOfProduce: 80 }
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
    farmers: [
      { id: 'F-KA-02', farmerNameOrAlias: 'Bopanna M.', landHoldingAcres: 6.8, cropsGrown: ['Arabica Coffee', 'Green Cardamom'], yearsOfFarming: 21 }
    ]
  },
  {
    id: 'ML-LKD',
    state: 'Meghalaya',
    district: 'Jaintia Hills (Lakadong)',
    lat: 25.4610,
    lng: 92.2150,
    primaryCrops: [
      {
        cropName: 'Lakadong High-Curcumin Turmeric',
        season: 'Kharif',
        areaHectares: 8500,
        yieldTonnesPerHectare: 6.2,
        totalProductionTonnes: 52700,
        harvestMonth: 'December',
        farmerCount: 12000,
        salesChannels: [
          { type: 'export', name: 'OmniGrowth Pharma & Extract Export', pricePerQuintal: 24500, percentOfProduce: 75 },
          { type: 'wholesale_mandi', name: 'Jowai Spice Platform', pricePerQuintal: 21000, percentOfProduce: 25 }
        ]
      }
    ],
    soil: {
      soilType: 'Organic Hill Red Clay',
      phLevel: 5.6,
      nitrogenLevel: 'high',
      phosphorusLevel: 'low',
      potassiumLevel: 'high',
      organicCarbonPercent: 1.62,
      irrigationSource: 'rainfed'
    },
    farmers: [
      { id: 'F-ML-01', farmerNameOrAlias: 'Kong Trinity Saioo', landHoldingAcres: 3.2, cropsGrown: ['Lakadong Turmeric'], yearsOfFarming: 20 }
    ]
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
          { type: 'wholesale_mandi', name: 'Erode Regulated Market Complex', pricePerQuintal: 14200, percentOfProduce: 80 },
          { type: 'export', name: 'OmniGrowth Spices Logistics', pricePerQuintal: 16500, percentOfProduce: 20 }
        ]
      },
      {
        cropName: 'Sugarcane',
        season: 'Zaid',
        areaHectares: 48000,
        yieldTonnesPerHectare: 105.0,
        totalProductionTonnes: 5040000,
        harvestMonth: 'January',
        farmerCount: 29000,
        salesChannels: [
          { type: 'cooperative', name: 'Bhavani Sugar Mills Fed', pricePerQuintal: 315, percentOfProduce: 90 }
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
    farmers: [
      { id: 'F-TN-02', farmerNameOrAlias: 'Senthil Kumar', landHoldingAcres: 5.0, cropsGrown: ['Erode Turmeric', 'Sugarcane'], yearsOfFarming: 19 }
    ]
  },
  {
    id: 'UP-BRB',
    state: 'Uttar Pradesh',
    district: 'Barabanki',
    lat: 26.9271,
    lng: 81.1834,
    primaryCrops: [
      {
        cropName: 'Mentha (Mint Oil)',
        season: 'Zaid',
        areaHectares: 52000,
        yieldTonnesPerHectare: 0.12,
        totalProductionTonnes: 6240,
        harvestMonth: 'June',
        farmerCount: 48000,
        salesChannels: [
          { type: 'export', name: 'OmniGrowth Menthol Industrial Supply', pricePerQuintal: 128000, percentOfProduce: 70 },
          { type: 'wholesale_mandi', name: 'Barabanki Mentha APMC', pricePerQuintal: 115000, percentOfProduce: 30 }
        ]
      },
      {
        cropName: 'Sugarcane',
        season: 'Rabi',
        areaHectares: 110000,
        yieldTonnesPerHectare: 82.0,
        totalProductionTonnes: 9020000,
        harvestMonth: 'November',
        farmerCount: 85000,
        salesChannels: [
          { type: 'cooperative', name: 'UP Cooperative Sugar Factories', pricePerQuintal: 350, percentOfProduce: 85 }
        ]
      }
    ],
    soil: {
      soilType: 'Gangetic Alluvial Silt',
      phLevel: 7.6,
      nitrogenLevel: 'high',
      phosphorusLevel: 'medium',
      potassiumLevel: 'medium',
      organicCarbonPercent: 0.74,
      irrigationSource: 'borewell'
    },
    farmers: [
      { id: 'F-UP-01', farmerNameOrAlias: 'Shiv Ram Verma', landHoldingAcres: 4.2, cropsGrown: ['Mentha', 'Sugarcane'], yearsOfFarming: 22 }
    ]
  },
  {
    id: 'AP-ATP',
    state: 'Andhra Pradesh',
    district: 'Anantapur',
    lat: 14.6819,
    lng: 77.6006,
    primaryCrops: [
      {
        cropName: 'Grand Naine Banana',
        season: 'Kharif',
        areaHectares: 48000,
        yieldTonnesPerHectare: 58.0,
        totalProductionTonnes: 2784000,
        harvestMonth: 'Year-round',
        farmerCount: 38000,
        salesChannels: [
          { type: 'export', name: 'OmniGrowth Cold-Chain Reefer Express', pricePerQuintal: 1850, percentOfProduce: 60 },
          { type: 'wholesale_mandi', name: 'Anantapur Banana Market', pricePerQuintal: 1450, percentOfProduce: 40 }
        ]
      },
      {
        cropName: 'Sweet Orange (Sathgudi)',
        season: 'Rabi',
        areaHectares: 32000,
        yieldTonnesPerHectare: 14.5,
        totalProductionTonnes: 464000,
        harvestMonth: 'September',
        farmerCount: 22000,
        salesChannels: [
          { type: 'wholesale_mandi', name: 'Tadpatri APMC Yard', pricePerQuintal: 3800, percentOfProduce: 70 }
        ]
      }
    ],
    soil: {
      soilType: 'Red Gravelly Arid Soil',
      phLevel: 7.7,
      nitrogenLevel: 'low',
      phosphorusLevel: 'medium',
      potassiumLevel: 'high',
      organicCarbonPercent: 0.42,
      irrigationSource: 'borewell'
    },
    farmers: [
      { id: 'F-AP-03', farmerNameOrAlias: 'Koti Reddy B.', landHoldingAcres: 7.0, cropsGrown: ['Banana', 'Sweet Orange'], yearsOfFarming: 25 }
    ]
  },
  {
    id: 'SK-GNG',
    state: 'Sikkim',
    district: 'Gangtok',
    lat: 27.3389,
    lng: 88.6065,
    primaryCrops: [
      {
        cropName: 'Organic Black Cardamom (Badi Elaichi)',
        season: 'Kharif',
        areaHectares: 12500,
        yieldTonnesPerHectare: 0.38,
        totalProductionTonnes: 4750,
        harvestMonth: 'October',
        farmerCount: 14000,
        salesChannels: [
          { type: 'export', name: 'OmniGrowth 100% Organic Certified Export', pricePerQuintal: 125000, percentOfProduce: 85 }
        ]
      }
    ],
    soil: {
      soilType: '100% Certified Organic Himalayan Loam',
      phLevel: 6.2,
      nitrogenLevel: 'high',
      phosphorusLevel: 'high',
      potassiumLevel: 'high',
      organicCarbonPercent: 2.15,
      irrigationSource: 'rainfed'
    },
    farmers: [
      { id: 'F-SK-01', farmerNameOrAlias: 'Tashi Bhutia', landHoldingAcres: 3.0, cropsGrown: ['Organic Black Cardamom'], yearsOfFarming: 28 }
    ]
  }
];

export function seedDatabase() {
  initDb();

  const insertRegion = db.prepare(`
    INSERT OR REPLACE INTO regions (id, state, district, lat, lng, primary_crops, soil, data_source, last_updated)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertFarmer = db.prepare(`
    INSERT OR REPLACE INTO farmers (id, region_id, farmer_name_or_alias, land_holding_acres, crops_grown, years_of_farming)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const reg of seedRegions) {
    insertRegion.run(
      reg.id,
      reg.state,
      reg.district,
      reg.lat,
      reg.lng,
      JSON.stringify(reg.primaryCrops),
      JSON.stringify(reg.soil),
      'real',
      new Date().toISOString()
    );

    for (const f of reg.farmers) {
      insertFarmer.run(
        f.id,
        reg.id,
        f.farmerNameOrAlias,
        f.landHoldingAcres,
        JSON.stringify(f.cropsGrown),
        f.yearsOfFarming
      );
    }
  }

  console.log(`[OmniGrowth] Successfully seeded ${seedRegions.length} high-variety crop districts and associated farmer records into SQLite!`);
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  seedDatabase();
}
