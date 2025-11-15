import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeedCard } from '@/components/FeedCard';
import { categories, mockAnnouncements } from '@/lib/mockData';
import {
  Heart,
  GraduationCap,
  Building2,
  Leaf,
  Briefcase,
  Calendar,
  Search,
  ArrowRight,
  CheckCircle,
  Users,
  Bell,
  MapPin,
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Heart,
  GraduationCap,
  Building2,
  Leaf,
  Briefcase,
  Calendar,
};

export default function Landing() {
  const { isAuthenticated, user } = useAuth();
  const featuredAnnouncements = mockAnnouncements.filter(a => a.featured).slice(0, 3);

  const getDashboardLink = () => {
    if (!user) return '/auth';
    switch (user.role) {
      case 'citizen':
        return '/citizen/dashboard';
      case 'organization':
        return '/organization/dashboard';
      case 'super_admin':
        return '/admin/dashboard';
      default:
        return '/auth';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-40 -z-10"></div>
        
        <div className="container max-w-6xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="mb-4">
            Welcome to MyKigali
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Your Gateway to
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {' '}
              Civic Information
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed about government services, community events, and local opportunities in
            Kigali. All in one place.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events, services, announcements..."
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to={getDashboardLink()}>
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/auth?mode=signup">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/browse">Browse Events</Link>
                </Button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Active Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">50+</div>
              <div className="text-sm text-muted-foreground">Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">10k+</div>
              <div className="text-sm text-muted-foreground">Citizens</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-info">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Categories</h2>
            <p className="text-muted-foreground">
              Find information and services across different sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => {
              const Icon = iconMap[category.icon];
              return (
                <Link key={category.id} to={`/browse?category=${category.id}`}>
                  <Card className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                    <div className="flex justify-center mb-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm">{category.name}</h3>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Events</h2>
              <p className="text-muted-foreground">
                Discover what's happening in Kigali right now
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAnnouncements.map(announcement => (
              <FeedCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose MyKigali?</h2>
            <p className="text-muted-foreground">
              Everything you need to stay connected with your city
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Verified Information</h3>
              <p className="text-sm text-muted-foreground">
                All announcements from verified government and trusted organizations
              </p>
            </Card>

            <Card className="p-6">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Location-Based</h3>
              <p className="text-sm text-muted-foreground">
                Find events and services near you with our interactive map
              </p>
            </Card>

            <Card className="p-6">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Smart Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized alerts about topics that matter to you
              </p>
            </Card>

            <Card className="p-6">
              <div className="h-12 w-12 rounded-full bg-info/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-info" />
              </div>
              <h3 className="font-semibold mb-2">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Connect with fellow citizens and engage with your community
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <Card className="p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-none">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of Kigali residents staying informed and engaged
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/auth?mode=signup">
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
