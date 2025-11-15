// Mock data for MyKigali platform

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Publisher {
  id: string;
  name: string;
  verified: boolean;
  avatar?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  start_date: string;
  end_date?: string;
  location?: Location;
  publisher: Publisher;
  views: number;
  reactions: {
    like: number;
    concern: number;
    helpful: number;
  };
  featured?: boolean;
  image?: string;
}

export interface Organization {
  id: string;
  name: string;
  verified: boolean;
  contacts: {
    phone: string;
    email: string;
  };
  description?: string;
  category?: string;
  avatar?: string;
}

export interface User {
  id: string;
  role: 'citizen' | 'organization' | 'super_admin';
  name: string;
  email: string;
  avatar?: string;
  organizationId?: string;
  preferences?: {
    language: 'en' | 'kin';
    categories: string[];
    location?: Location;
  };
}

export const categories = [
  { id: 'health', name: 'Health', icon: 'Heart' },
  { id: 'education', name: 'Education', icon: 'GraduationCap' },
  { id: 'governance', name: 'Governance', icon: 'Building2' },
  { id: 'environment', name: 'Environment', icon: 'Leaf' },
  { id: 'jobs', name: 'Jobs', icon: 'Briefcase' },
  { id: 'events', name: 'Events', icon: 'Calendar' },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'evt_01',
    title: 'Free Health Camp - Gasabo District',
    category: 'health',
    description: 'Free medical checkups and consultations for all Gasabo residents',
    content: 'The Kigali Health Department is organizing a free health camp in Gasabo District. Services include general health checkups, blood pressure monitoring, diabetes screening, and health consultations. No appointment necessary - walk-ins welcome.',
    start_date: '2025-11-20T08:00:00Z',
    end_date: '2025-11-20T14:00:00Z',
    location: {
      lat: -1.9536,
      lng: 30.0919,
      address: 'Gasabo District Health Center',
    },
    publisher: {
      id: 'org_01',
      name: 'Kigali Health Department',
      verified: true,
    },
    views: 1234,
    reactions: { like: 120, concern: 5, helpful: 89 },
    featured: true,
  },
  {
    id: 'evt_02',
    title: 'Skills Training Program - Youth Opportunity',
    category: 'education',
    description: 'Free digital skills training for youth aged 18-30',
    content: 'The Rwanda Education Board announces a new digital skills training program focusing on web development, graphic design, and digital marketing. Program duration: 3 months. Applications open until November 30th.',
    start_date: '2025-12-01T09:00:00Z',
    end_date: '2026-02-28T17:00:00Z',
    location: {
      lat: -1.9437,
      lng: 30.0598,
      address: 'Kigali Innovation City',
    },
    publisher: {
      id: 'org_02',
      name: 'Rwanda Education Board',
      verified: true,
    },
    views: 2456,
    reactions: { like: 340, concern: 2, helpful: 267 },
    featured: true,
  },
  {
    id: 'evt_03',
    title: 'Community Clean-Up Day - Kimironko',
    category: 'environment',
    description: 'Monthly community cleanup initiative in Kimironko sector',
    content: 'Join us for our monthly community cleanup day! We provide gloves, bags, and refreshments. Together we can keep Kigali clean and beautiful. All ages welcome.',
    start_date: '2025-11-25T07:00:00Z',
    end_date: '2025-11-25T12:00:00Z',
    location: {
      lat: -1.9489,
      lng: 30.1261,
      address: 'Kimironko Market Area',
    },
    publisher: {
      id: 'org_03',
      name: 'Kigali City Council',
      verified: true,
    },
    views: 876,
    reactions: { like: 98, concern: 0, helpful: 76 },
  },
  {
    id: 'evt_04',
    title: 'Job Fair - Technology Sector',
    category: 'jobs',
    description: 'Connect with leading tech companies hiring in Kigali',
    content: '20+ companies will be present, including local startups and international firms. Bring your CV and be ready for on-spot interviews. Dress code: Business casual.',
    start_date: '2025-12-05T09:00:00Z',
    end_date: '2025-12-05T17:00:00Z',
    location: {
      lat: -1.9437,
      lng: 30.0598,
      address: 'Kigali Convention Centre',
    },
    publisher: {
      id: 'org_04',
      name: 'Rwanda Development Board',
      verified: true,
    },
    views: 3421,
    reactions: { like: 456, concern: 12, helpful: 389 },
    featured: true,
  },
  {
    id: 'evt_05',
    title: 'Public Consultation - New Traffic Rules',
    category: 'governance',
    description: 'Share your feedback on proposed traffic regulations',
    content: 'The City of Kigali invites all citizens to participate in a public consultation regarding proposed updates to traffic regulations. Your input matters in shaping our city policies.',
    start_date: '2025-11-28T14:00:00Z',
    end_date: '2025-11-28T18:00:00Z',
    location: {
      lat: -1.9520,
      lng: 30.0607,
      address: 'City Hall, Nyarugenge',
    },
    publisher: {
      id: 'org_03',
      name: 'Kigali City Council',
      verified: true,
    },
    views: 1567,
    reactions: { like: 234, concern: 45, helpful: 167 },
  },
];

export const mockOrganizations: Organization[] = [
  {
    id: 'org_01',
    name: 'Kigali Health Department',
    verified: true,
    contacts: {
      phone: '+250788123456',
      email: 'health@kigali.gov.rw',
    },
    description: 'Providing quality healthcare services to all Kigali residents',
    category: 'health',
  },
  {
    id: 'org_02',
    name: 'Rwanda Education Board',
    verified: true,
    contacts: {
      phone: '+250788234567',
      email: 'info@reb.gov.rw',
    },
    description: 'Transforming education for national development',
    category: 'education',
  },
  {
    id: 'org_03',
    name: 'Kigali City Council',
    verified: true,
    contacts: {
      phone: '+250788345678',
      email: 'info@kigalicity.gov.rw',
    },
    description: 'Building a clean, prosperous, and resilient city',
    category: 'governance',
  },
];

export const mockUser: User = {
  id: 'user_001',
  role: 'citizen',
  name: 'Alice Uwase',
  email: 'alice@example.com',
  preferences: {
    language: 'en',
    categories: ['health', 'education', 'events'],
    location: {
      lat: -1.9536,
      lng: 30.0919,
      address: 'Gasabo, Kigali',
    },
  },
};

export const mockRecommendations: Announcement[] = [
  mockAnnouncements[0],
  mockAnnouncements[1],
  mockAnnouncements[4],
];
