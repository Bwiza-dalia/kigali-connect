// API Service Layer - placeholder functions for backend integration
import { Announcement, Organization, User } from './mockData';
import { mockAnnouncements, mockOrganizations, mockUser, mockRecommendations } from './mockData';

const USE_MOCK = true; // Set to false when backend is ready

// Authentication API
export const authService = {
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        token: 'mock_jwt_token_' + Date.now(),
        user: mockUser,
      };
    }
    // Real API call would go here
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async signup(email: string, password: string, name: string, role: string): Promise<{ token: string; user: User }> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        token: 'mock_jwt_token_' + Date.now(),
        user: { ...mockUser, email, name, role: role as any },
      };
    }
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role }),
    });
    return response.json();
  },

  async logout(): Promise<void> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return;
    }
    await fetch('/api/auth/logout', { method: 'POST' });
  },
};

// Content API
export const contentService = {
  async getAnnouncements(filters?: { category?: string; search?: string }): Promise<Announcement[]> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      let filtered = [...mockAnnouncements];
      if (filters?.category) {
        filtered = filtered.filter(a => a.category === filters.category);
      }
      if (filters?.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(a => 
          a.title.toLowerCase().includes(search) || 
          a.description.toLowerCase().includes(search)
        );
      }
      return filtered;
    }
    const params = new URLSearchParams(filters as any);
    const response = await fetch(`/api/announcements?${params}`);
    return response.json();
  },

  async getAnnouncementById(id: string): Promise<Announcement | null> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockAnnouncements.find(a => a.id === id) || null;
    }
    const response = await fetch(`/api/announcements/${id}`);
    return response.json();
  },

  async createAnnouncement(data: Partial<Announcement>): Promise<Announcement> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        ...data,
        id: 'evt_' + Date.now(),
        views: 0,
        reactions: { like: 0, concern: 0, helpful: 0 },
      } as Announcement;
    }
    const response = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// Recommendations API
export const recommendationService = {
  async get(userId: string, location?: { lat: number; lng: number }): Promise<Announcement[]> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockRecommendations;
    }
    const response = await fetch('/api/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, location }),
    });
    return response.json();
  },
};

// Chatbot API
export const chatbotService = {
  async sendMessage(userId: string, message: string): Promise<{ reply: string; suggestions: string[] }> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        reply: `I understand you're asking about "${message}". Based on current events in Kigali, I can help you find relevant health services, upcoming events, or government announcements. What would you like to know more about?`,
        suggestions: [
          'Show me health services near me',
          'What events are happening this week?',
          'Tell me about education programs',
        ],
      };
    }
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, message }),
    });
    return response.json();
  },
};

// Analytics API
export const analyticsService = {
  async getOrgStats(orgId: string): Promise<any> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        totalViews: 12543,
        totalReactions: 1456,
        totalPosts: 23,
        engagementRate: 11.6,
        viewsOverTime: [
          { date: '2025-11-10', views: 234 },
          { date: '2025-11-11', views: 456 },
          { date: '2025-11-12', views: 567 },
          { date: '2025-11-13', views: 432 },
          { date: '2025-11-14', views: 678 },
          { date: '2025-11-15', views: 890 },
          { date: '2025-11-16', views: 756 },
        ],
        categoryBreakdown: [
          { category: 'Health', count: 45 },
          { category: 'Education', count: 32 },
          { category: 'Events', count: 23 },
        ],
        sentiment: {
          positive: 78,
          neutral: 18,
          negative: 4,
        },
      };
    }
    const response = await fetch(`/api/analytics/organization/${orgId}`);
    return response.json();
  },
};

// Organization API
export const organizationService = {
  async getAll(): Promise<Organization[]> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockOrganizations;
    }
    const response = await fetch('/api/organizations');
    return response.json();
  },

  async getById(id: string): Promise<Organization | null> {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockOrganizations.find(o => o.id === id) || null;
    }
    const response = await fetch(`/api/organizations/${id}`);
    return response.json();
  },
};
