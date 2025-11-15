import { Link } from 'react-router-dom';
import { Announcement } from '@/lib/mockData';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ThumbsUp, Heart, MapPin, Eye, Calendar, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { format } from 'date-fns';

interface FeedCardProps {
  announcement: Announcement;
  variant?: 'compact' | 'expanded';
}

export const FeedCard: React.FC<FeedCardProps> = ({ announcement, variant = 'compact' }) => {
  const categoryColors: Record<string, string> = {
    health: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    education: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    governance: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    environment: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    jobs: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    events: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {announcement.publisher.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm truncate">
                  {announcement.publisher.name}
                </p>
                {announcement.publisher.verified && (
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {format(new Date(announcement.start_date), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          <Badge className={categoryColors[announcement.category] || 'bg-muted'}>
            {announcement.category}
          </Badge>
        </div>

        <Link to={`/events/${announcement.id}`} className="block">
          <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
            {announcement.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className={`text-muted-foreground ${variant === 'compact' ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {announcement.description}
        </p>

        {announcement.location && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{announcement.location.address}</span>
          </div>
        )}

        {announcement.end_date && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>
              {format(new Date(announcement.start_date), 'MMM d')} -{' '}
              {format(new Date(announcement.end_date), 'MMM d, yyyy')}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{announcement.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{announcement.reactions.like}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button size="sm" asChild>
            <Link to={`/events/${announcement.id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
