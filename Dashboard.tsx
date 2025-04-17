
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, MapPin, Droplet, User, Phone, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import MainLayout from "@/components/layout/MainLayout";

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);
  
  // Fetch emergency requests
  const { data: emergencyRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ["emergencyRequests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emergency_requests")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user,
  });
  
  // Fetch user notifications
  const { data: notifications, isLoading: notificationsLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      return data || [];
    },
    enabled: !!user,
  });
  
  // Fetch user profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      return data || null;
    },
    enabled: !!user,
  });
  
  if (authLoading || !user) {
    return (
      <MainLayout>
        <div className="py-12 bg-neutral">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <div className="animate-pulse">Loading...</div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="py-12 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-trust-dark">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {profile?.full_name || user.email}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-trust-dark text-lg">Your Blood Group</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Droplet className="h-10 w-10 text-blood mr-3" />
                  <span className="text-3xl font-bold">{profile?.blood_group || "N/A"}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-trust-dark text-lg">Last Donation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="h-10 w-10 text-blood mr-3" />
                  <span className="text-lg">
                    {profile?.last_donation_date
                      ? new Date(profile.last_donation_date).toLocaleDateString()
                      : "No recent donations"}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-trust-dark text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <MapPin className="h-10 w-10 text-blood mr-3" />
                  <span className="text-lg">
                    {profile?.city && profile?.state
                      ? `${profile.city}, ${profile.state}`
                      : "Location not set"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="requests">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="requests">Emergency Requests</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="requests">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-trust-dark">Recent Emergency Requests</h2>
                  <Button 
                    onClick={() => navigate("/emergency-request")}
                    className="bg-blood hover:bg-blood-dark"
                  >
                    Create New Request
                  </Button>
                </div>
                
                {requestsLoading ? (
                  <div className="animate-pulse">Loading requests...</div>
                ) : emergencyRequests && emergencyRequests.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {emergencyRequests.map((request) => (
                      <Card key={request.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg text-trust-dark">
                                {request.patient_name}
                              </CardTitle>
                              <CardDescription>
                                {new Date(request.created_at).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <Badge className={
                              request.urgency_level === "critical"
                                ? "bg-red-600"
                                : request.urgency_level === "urgent"
                                ? "bg-orange-500"
                                : "bg-yellow-600"
                            }>
                              {request.urgency_level.charAt(0).toUpperCase() + request.urgency_level.slice(1)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Droplet className="h-4 w-4 text-blood mr-2" />
                              <span>
                                <strong>Blood Group:</strong> {request.blood_group} ({request.units_needed} units)
                              </span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-blood mr-2" />
                              <span>
                                <strong>Hospital:</strong> {request.hospital_name}, {request.city}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <User className="h-4 w-4 text-blood mr-2" />
                              <span>
                                <strong>Contact:</strong> {request.contact_name}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 text-blood mr-2" />
                              <span>
                                <strong>Phone:</strong> {request.contact_phone}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-6">
                      <div className="text-center">
                        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-trust-dark">No emergency requests found</h3>
                        <p className="text-muted-foreground mt-1">
                          Create a new emergency request to find blood donors quickly.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-trust-dark">Your Notifications</h2>
                
                {notificationsLoading ? (
                  <div className="animate-pulse">Loading notifications...</div>
                ) : notifications && notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <Card key={notification.id}>
                        <CardContent className="py-4">
                          <div className="flex items-start">
                            <div className="bg-neutral rounded-full p-2 mr-4 flex-shrink-0">
                              <AlertCircle className="h-5 w-5 text-blood" />
                            </div>
                            <div>
                              <h3 className="font-medium text-trust-dark">{notification.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-2">
                                {new Date(notification.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-6">
                      <div className="text-center">
                        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-trust-dark">No notifications</h3>
                        <p className="text-muted-foreground mt-1">
                          You don't have any notifications at the moment.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-trust-dark">Your Profile</h2>
                
                {profileLoading ? (
                  <div className="animate-pulse">Loading profile...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-trust-dark">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium">{profile?.full_name || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{profile?.email || user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{profile?.phone || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Age</p>
                          <p className="font-medium">{profile?.age || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Gender</p>
                          <p className="font-medium">
                            {profile?.gender
                              ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)
                              : "Not provided"}
                          </p>
                        </div>
                        <Button
                          onClick={() => navigate("/donor-registration")}
                          variant="outline"
                          className="w-full mt-4"
                        >
                          Update Profile
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-trust-dark">Donor Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Blood Group</p>
                          <p className="font-medium">{profile?.blood_group || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">
                            {profile?.city && profile?.state
                              ? `${profile.city}, ${profile.state}`
                              : "Not provided"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Donation</p>
                          <p className="font-medium">
                            {profile?.last_donation_date
                              ? new Date(profile.last_donation_date).toLocaleDateString()
                              : "No donation record"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Privacy Settings</p>
                          <p className="font-medium">
                            {profile?.hide_contact_info
                              ? "Contact information hidden from public"
                              : "Contact information visible to requesters"}
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-center">
                            <Heart className="h-8 w-8 text-blood mr-3" />
                            <p className="text-lg font-medium">Thank you for being a donor!</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
