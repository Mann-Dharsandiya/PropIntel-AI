 export interface Property {
  _id: string;

  title: string;

  description: string;

  price: number;

  propertyType: string;

  bedrooms: number;

  bathrooms: number;

  area: number;

  address: string;

  city: string;

  locality: string;

  state: string;

  country: string;

  images: string[];

  owner: any;

  status: "available" | "sold";

  createdAt?: string;

  updatedAt?: string;

  // ---------- NEW FIELDS ----------

  builder: string;

  project: string;

  aiScore: number;

  investmentScore: number;

  rentalYield: number;

  appreciation: number;

  featured: boolean;

  verified: boolean;

  amenities: string[];

  nearby: string[];
}

export interface ParsedQuery {
  city?: string;

  locality?: string;

  bhk?: number;

  budget?: number;

  propertyType?: string;

  furnished?: boolean;

  purpose?: string;
}

export interface ConversationMemory {
  sessionId: string;

  lastQuery?: string;

  parsedQuery?: ParsedQuery;

  toolResults?: any;

  lastAnswer?: string;

  updatedAt?: string;
}

export interface AdvisorResponse {
  success: boolean;

  sessionId: string;

  answer: string;

  memory: ConversationMemory;

  toolResults: {
    properties?: Property[];

    recommendation?: any;

    prediction?: any;

    locality?: any;

    compare?: any;

    investment?: any;
  };
}

export interface ChatMessage {
  id: string;

  role: "user" | "assistant";

  message: string;

  properties?: Property[];
}