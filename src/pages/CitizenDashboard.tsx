import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatbotWidget } from '@/components/ChatbotWidget';
import { FeedCard } from '@/components/FeedCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { contentService, recommendationService } from '@/lib/apiService';
import { Announcement, categories } from '@/lib/mockData';
import { Sparkles, MapPin, Bookmark, Settings, TrendingUp } from 'lucide-react';

export default function CitizenDashboard() {
  const { user } = useAuth();
  const [feed, setFeed] = useState<Announcement[]>([]);
  const [recommendations, setRecommendations] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [feedData, recsData] = await Promise.all([
          contentService.getAnnouncements(),
          recommendationService.get(user?.id || '', user?.preferences?.location),
        ]);
        setFeed(feedData);
        setRecommendations(recsData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                  <p className="text-muted-foreground">
                    Here's what's happening in Kigali today
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/map">
                    <MapPin className="mr-2 h-4 w-4" />
                    View Map
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendations */}
            {recommendations.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h2 className="text-xl font-bold">Recommended for You</h2>
                  <Badge variant="secondary" className="ml-2">
                    AI Powered
                  </Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {recommendations.slice(0, 2).map(announcement => (
                    <FeedCard key={announcement.id} announcement={announcement} variant="compact" />
                  ))}
                </div>
              </div>
            )}

            {/* Feed Tabs */}
            <div>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
                  <TabsTrigger value="all">All Updates</TabsTrigger>
                  {user?.preferences?.categories?.map(cat => {
                    const category = categories.find(c => c.id === cat);
                    return (
                      <TabsTrigger key={cat} value={cat}>
                        {category?.name}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-6">
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : (
                    feed.map(announcement => (
                      <FeedCard key={announcement.id} announcement={announcement} />
                    ))
                  )}
                </TabsContent>

                {user?.preferences?.categories?.map(cat => (
                  <TabsContent key={cat} value={cat} className="space-y-4 mt-6">
                    {feed
                      .filter(a => a.category === cat)
                      .map(announcement => (
                        <FeedCard key={announcement.id} announcement={announcement} />
                      ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Events Viewed</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Saved Items</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Following</span>
                  <span className="font-semibold">12 orgs</span>
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user?.preferences?.categories?.map(cat => {
                    const category = categories.find(c => c.id === cat);
                    return (
                      <Badge key={cat} variant="secondary">
                        {category?.name}
                      </Badge>
                    );
                  }) || (
                    <p className="text-sm text-muted-foreground">
                      No interests set yet
                    </p>
                  )}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link to="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Preferences
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Saved Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bookmark className="h-5 w-5" />
                  Saved for Later
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Quick access to your bookmarked events
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/saved">View All Saved</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <ChatbotWidget />
      <Footer />
    </div>
  );
}
