
import { useState } from "react";
import { Bell, BellRing, Calendar, MapPin, Droplet, Check, X, ArrowRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample notifications data
const sampleNotifications = [
  {
    id: 1,
    type: "request",
    bloodType: "O+",
    hospital: "AIIMS Hospital",
    location: "Delhi",
    distance: "3.2 km",
    time: "30 minutes ago",
    status: "active",
    details: "Urgent need for accident victim. 2 units required.",
  },
  {
    id: 2,
    type: "general",
    title: "Your donor profile is verified!",
    time: "2 hours ago",
    status: "unread",
    details: "Your donor profile has been verified. You can now respond to blood requests.",
  },
  {
    id: 3,
    type: "request",
    bloodType: "AB-",
    hospital: "City Hospital",
    location: "Mumbai",
    distance: "5.7 km",
    time: "4 hours ago",
    status: "active",
    details: "Rare blood type needed for surgery scheduled tomorrow.",
  },
  {
    id: 4,
    type: "thank",
    bloodType: "B+",
    hospital: "Max Healthcare",
    time: "2 days ago",
    donationId: "D-20230521",
    status: "read",
    details: "Thank you for your donation! You helped save a life today.",
  },
  {
    id: 5,
    type: "general",
    title: "World Blood Donor Day",
    time: "5 days ago",
    status: "read",
    details: "Join us in celebrating World Blood Donor Day on June 14th! Special recognition for all donors.",
  },
  {
    id: 6,
    type: "request",
    bloodType: "A+",
    hospital: "Columbia Asia",
    location: "Bangalore",
    distance: "4.5 km",
    time: "1 week ago",
    status: "expired",
    details: "Need for a scheduled surgery. Request fulfilled.",
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, status: "read" } : notification
      )
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  // Filter notifications by type
  const requestNotifications = notifications.filter((notification) => notification.type === "request");
  const generalNotifications = notifications.filter((notification) => notification.type === "general" || notification.type === "thank");
  
  // Calculate unread counts
  const unreadRequests = requestNotifications.filter((n) => n.status === "unread" || n.status === "active").length;
  const unreadGeneral = generalNotifications.filter((n) => n.status === "unread").length;

  return (
    <MainLayout>
      <section className="py-10 bg-neutral">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-trust-dark">Notifications</h1>
            <Button
              onClick={() => {
                setNotifications(
                  notifications.map((n) => ({ ...n, status: n.status === "unread" ? "read" : n.status }))
                );
              }}
              variant="outline"
              className="text-blood border-blood hover:bg-blood/5"
            >
              Mark all as read
            </Button>
          </div>

          <Tabs defaultValue="requests" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="requests" className="relative">
                Blood Requests
                {unreadRequests > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blood text-white rounded-full text-xs flex items-center justify-center">
                    {unreadRequests}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="general" className="relative">
                General
                {unreadGeneral > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blood text-white rounded-full text-xs flex items-center justify-center">
                    {unreadGeneral}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="space-y-4">
              {requestNotifications.length > 0 ? (
                requestNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`overflow-hidden hover:shadow-md transition-shadow ${
                      notification.status === "unread" || notification.status === "active"
                        ? "border-l-4 border-l-blood"
                        : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {notification.status === "active" ? (
                              <div className="relative">
                                <BellRing className="h-6 w-6 text-blood" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blood rounded-full animate-pulse"></span>
                              </div>
                            ) : notification.status === "expired" ? (
                              <Bell className="h-6 w-6 text-gray-400" />
                            ) : (
                              <Bell className="h-6 w-6 text-blood" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="font-medium text-trust-dark">
                                Blood Request: {notification.bloodType}
                              </span>
                              <Badge
                                variant={
                                  notification.status === "active"
                                    ? "destructive"
                                    : notification.status === "expired"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="ml-2"
                              >
                                {notification.status === "active"
                                  ? "Active"
                                  : notification.status === "expired"
                                  ? "Fulfilled"
                                  : "New"}
                              </Badge>
                              <span className="text-xs text-gray-500 ml-2">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.details}</p>

                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {notification.hospital}, {notification.location}
                              </span>
                              <span className="flex items-center">
                                <Droplet className="h-3 w-3 mr-1" />
                                {notification.bloodType} blood type
                              </span>
                              {notification.distance && (
                                <span className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {notification.distance} from you
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-2">
                          {notification.status === "expired" ? null : (
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-blood hover:bg-blood-dark"
                            >
                              Respond
                              <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            title="Delete"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No blood requests at this time</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="general" className="space-y-4">
              {generalNotifications.length > 0 ? (
                generalNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`overflow-hidden hover:shadow-md transition-shadow ${
                      notification.status === "unread" ? "border-l-4 border-l-blood" : ""
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {notification.type === "thank" ? (
                              <Heart className="h-6 w-6 text-blood" />
                            ) : (
                              <Bell className="h-6 w-6 text-trust" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="font-medium text-trust-dark">
                                {notification.type === "thank"
                                  ? `Thank you for donating ${notification.bloodType} blood`
                                  : notification.title}
                              </span>
                              {notification.status === "unread" && (
                                <Badge variant="outline" className="ml-2">
                                  New
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500 ml-2">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.details}</p>

                            {notification.type === "thank" && (
                              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {notification.hospital}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Donation ID: {notification.donationId}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex space-x-2 ml-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            title="Delete"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <Bell className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No notifications at this time</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

// Mock component for Heart icon
const Heart = ({ className }) => <div className={className}>❤️</div>;

export default Notifications;
