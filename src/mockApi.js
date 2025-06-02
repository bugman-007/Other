// Mock API functions for development purposes

// Mock analytics data generator
export const mockGetAnalyticsData = () => {
  return {
    merchantSites: 125,
    totalClicks: 5240,
    conversion: 3.2,
    affiliateLinks: Array(87).fill({}),
    totalAffiliates: 87,
    activeAffiliates: 64,
    totalConversions: 168,
    conversionRate: 3.2,
    bounceRate: 42.5,
    averageOrderValue: 92.14,
    totalSubscribers: 243,
    activeSubscriptions: 216,
    churnRate: 2.8,
    revenuePerSubscriber: 48.75,
    totalUsers: 1450,
    activeUsers: 870
  };
};

// Add more mock API functions as needed 