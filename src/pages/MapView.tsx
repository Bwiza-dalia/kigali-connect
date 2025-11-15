import { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockAnnouncements } from '@/lib/mockData';
import { MapPin, X, Calendar, Eye, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MapView() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [mapError, setMapError] = useState(false);

  const eventsWithLocation = mockAnnouncements.filter(a => a.location);

  useEffect(() => {
    // Note: In production, integrate Leaflet or Mapbox here
    // For now, we'll show a placeholder with event pins
    setMapError(true); // Simulating missing map library
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 relative">
        <div className="h-[calc(100vh-4rem)] relative">
          {/* Map Container */}
          <div
            ref={mapContainerRef}
            className="absolute inset-0 bg-muted flex items-center justify-center"
          >
            {mapError ? (
              <div className="text-center space-y-4 p-8">
                <MapPin className="h-16 w-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Map Integration Required</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    To use the interactive map, please add a Mapbox or Leaflet integration.
                    The map will display all events with location data as pins.
                  </p>
                </div>
                <div className="pt-4">
                  <p className="text-sm font-medium mb-3">Events with Locations:</p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                    {eventsWithLocation.map(event => (
                      <Button
                        key={event.id}
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.title}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                {/* Actual map would render here */}
              </div>
            )}
          </div>

          {/* Event Details Sidebar */}
          {selectedEvent && (
            <div className="absolute right-4 top-4 bottom-4 w-96 max-w-[calc(100vw-2rem)] overflow-y-auto">
              <Card className="shadow-xl">
                <CardContent className="p-0">
                  <div className="relative p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setSelectedEvent(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Badge className="mb-3">{selectedEvent.category}</Badge>
                    <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      by {selectedEvent.publisher.name}
                    </p>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-sm">{selectedEvent.description}</p>

                    <div className="space-y-2 text-sm">
                      {selectedEvent.location && (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                          <span>{selectedEvent.location.address}</span>
                        </div>
                      )}

                      {selectedEvent.start_date && (
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                          <span>
                            {new Date(selectedEvent.start_date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedEvent.views} views</span>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link to={`/events/${selectedEvent.id}`}>
                        View Full Details
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Legend */}
          <Card className="absolute left-4 bottom-4 shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-semibold text-sm mb-2">Legend</h3>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>Health</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span>Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Environment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                  <span>Jobs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
