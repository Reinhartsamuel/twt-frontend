export interface NFTItem {
  id: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  collection?: string;
  isOwned: boolean;
  creator: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  avatar: string;
  username: string;
  handle: string;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
  nftsCount: number;
  bio?: string;
  isFollowing?: boolean;
  joinedDate: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    discord?: string;
  };
  stats: {
    totalVolume: number;
    totalSales: number;
    floorPrice: number;
  };
  nfts: {
    created: NFTItem[];
    owned: NFTItem[];
    collections: NFTItem[];
  };
}

export const dummyProfileData: UserProfile = {
  id: "user_1",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  username: "0xwnrft",
  handle: "0xwnrft",
  isVerified: true,
  followersCount: 3000,
  followingCount: 250,
  nftsCount: 831,
  bio: "The Kindest Pixel Wizard On The Web. Designing Joy Into Every Pixel.",
  isFollowing: false,
  joinedDate: "2021-03-15",
  location: "Metaverse",
  website: "https://0xwnrft.art",
  socialLinks: {
    twitter: "@0xwnrft",
    instagram: "@0xwnrft",
    discord: "0xwnrft#1337"
  },
  stats: {
    totalVolume: 2456.7,
    totalSales: 831,
    floorPrice: 1.24
  },
  nfts: {
    created: [
      {
        id: "nft_1",
        title: "Geometric Dreams",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
        price: 2.45,
        currency: "SOL",
        collection: "Abstract Realities",
        isOwned: true,
        creator: "0xwnrft",
        createdAt: "2024-01-15"
      },
      {
        id: "nft_2", 
        title: "Cyber City 2077",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        price: 3.88,
        currency: "SOL",
        collection: "Neon Genesis",
        isOwned: true,
        creator: "0xwnrft",
        createdAt: "2024-01-12"
      },
      {
        id: "nft_3",
        title: "Digital Dreamscape", 
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop",
        price: 1.24,
        currency: "SOL",
        collection: "Dream Sequence",
        isOwned: true,
        creator: "0xwnrft", 
        createdAt: "2024-01-10"
      }
    ],
    owned: [
      {
        id: "nft_4",
        title: "Abstract Reality",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
        price: 2.76,
        currency: "SOL",
        isOwned: true,
        creator: "PixelMaster",
        createdAt: "2024-01-08"
      },
      {
        id: "nft_5",
        title: "Neon Genesis",
        image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400&h=400&fit=crop",
        price: 7.12,
        currency: "SOL",
        isOwned: true,
        creator: "NeonDreams",
        createdAt: "2024-01-05"
      }
    ],
    collections: [
      {
        id: "nft_6",
        title: "Quantum Pixels",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=400&fit=crop",
        price: 0.89,
        currency: "SOL",
        collection: "Quantum Collection",
        isOwned: false,
        creator: "GalaxyCollector",
        createdAt: "2024-01-03"
      },
      {
        id: "nft_7",
        title: "Digital Renaissance",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
        price: 1.55,
        currency: "SOL",
        collection: "Renaissance Revival",
        isOwned: false,
        creator: "RetroWave",
        createdAt: "2024-01-01"
      }
    ]
  }
};

// Additional dummy profiles for variety
export const alternativeProfiles: UserProfile[] = [
  {
    id: "user_2",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    username: "CryptoArtist",
    handle: "cryptoartist",
    isVerified: true,
    followersCount: 12500,
    followingCount: 180,
    nftsCount: 892,
    bio: "Digital artist creating the future of NFTs. Collector of rare pixels and dreams.",
    isFollowing: true,
    joinedDate: "2020-11-22",
    location: "Digital Realm",
    website: "https://cryptoartist.io",
    socialLinks: {
      twitter: "@cryptoartist",
      instagram: "@cryptoartist"
    },
    stats: {
      totalVolume: 15420.3,
      totalSales: 892,
      floorPrice: 3.2
    },
    nfts: {
      created: [],
      owned: [],
      collections: []
    }
  },
  {
    id: "user_3",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    username: "PixelMaster",
    handle: "pixelmaster",
    isVerified: false,
    followersCount: 890,
    followingCount: 340,
    nftsCount: 156,
    bio: "Indie game developer turned NFT creator. Building worlds one pixel at a time.",
    isFollowing: false,
    joinedDate: "2022-05-18",
    location: "Tokyo, Japan",
    stats: {
      totalVolume: 892.5,
      totalSales: 156,
      floorPrice: 1.8
    },
    nfts: {
      created: [],
      owned: [],
      collections: []
    }
  },
  {
    id: "user_4",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    username: "NeonDreams",
    handle: "neondreams",
    isVerified: true,
    followersCount: 7800,
    followingCount: 95,
    nftsCount: 1203,
    bio: "Synthwave aesthetic meets blockchain technology. Curator of digital nostalgia.",
    isFollowing: false,
    joinedDate: "2021-08-10",
    location: "Miami, FL",
    website: "https://neondreams.art",
    socialLinks: {
      twitter: "@neondreams",
      discord: "neondreams#8080"
    },
    stats: {
      totalVolume: 8934.2,
      totalSales: 1203,
      floorPrice: 2.1
    },
    nfts: {
      created: [],
      owned: [],
      collections: []
    }
  },
  {
    id: "user_5",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    username: "GalaxyCollector",
    handle: "galaxycollector",
    isVerified: true,
    followersCount: 15200,
    followingCount: 67,
    nftsCount: 2156,
    bio: "Exploring the cosmos through digital art. Space enthusiast and NFT maximalist.",
    isFollowing: true,
    joinedDate: "2020-12-03",
    location: "Outer Space",
    website: "https://galaxycollector.space",
    socialLinks: {
      twitter: "@galaxycollector",
      instagram: "@galaxycollector"
    },
    stats: {
      totalVolume: 24567.8,
      totalSales: 2156,
      floorPrice: 4.5
    },
    nfts: {
      created: [],
      owned: [],
      collections: []
    }
  },
  {
    id: "user_6",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    username: "RetroWave",
    handle: "retrowave",
    isVerified: false,
    followersCount: 2340,
    followingCount: 456,
    nftsCount: 78,
    bio: "80s vibes in a digital world. Creating nostalgic art for the metaverse generation.",
    isFollowing: false,
    joinedDate: "2023-02-14",
    location: "Los Angeles, CA",
    stats: {
      totalVolume: 456.3,
      totalSales: 78,
      floorPrice: 0.9
    },
    nfts: {
      created: [],
      owned: [],
      collections: []
    }
  }
];

// Function to get a random profile
export const getRandomProfile = (): UserProfile => {
  const allProfiles = [dummyProfileData, ...alternativeProfiles];
  return allProfiles[Math.floor(Math.random() * allProfiles.length)];
};

// Function to get profile by handle
export const getProfileByHandle = (handle: string): UserProfile | undefined => {
  const allProfiles = [dummyProfileData, ...alternativeProfiles];
  return allProfiles.find(profile => profile.handle === handle);
};