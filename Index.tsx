
import { Link } from "react-router-dom";
import { Heart, User, MapPin, Bell, Calendar, Award } from "lucide-react";
import BloodIcon from "@/components/icons/BloodIcon";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  // Blood request data (simulated)
  const emergencyRequests = [
    {
      id: 1,
      bloodType: "O+",
      location: "AIIMS Hospital, Delhi",
      timePosted: "20 minutes ago",
      urgency: "Critical",
    },
    {
      id: 2,
      bloodType: "AB-",
      location: "City Hospital, Mumbai",
      timePosted: "45 minutes ago",
      urgency: "Urgent",
    },
    {
      id: 3,
      bloodType: "B+",
      location: "Medical College, Chennai",
      timePosted: "1 hour ago",
      urgency: "Moderate",
    },
  ];

  // Impact statistics (simulated)
  const impactStats = [
    { label: "Registered Donors", value: "5,240+", icon: User },
    { label: "Blood Requests Fulfilled", value: "1,830+", icon: Heart },
    { label: "Lives Saved", value: "2,500+", icon: Heart },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blood to-blood-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Your Donation Is Someone's Only Hope
              </h1>
              <p className="text-lg mb-8">
                RakthSetu connects blood donors with patients in emergency situations.
                Be a life-saver today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-blood hover:bg-neutral">
                  <Link to="/donor-registration">Become a Donor</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <Link to="/emergency-request">Request Blood</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-white/20 rounded-full p-6 flex items-center justify-center">
                  <div className="w-48 h-48 bg-white/30 rounded-full p-6 flex items-center justify-center">
                    <BloodIcon className="h-24 w-24 text-white" />
                  </div>
                </div>
                <div className="absolute -top-5 -right-5 bg-white text-blood rounded-full p-3">
                  <Heart className="h-8 w-8" />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-white text-blood rounded-full p-3">
                  <User className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Requests Section */}
      <section className="py-12 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-trust-dark mb-2">Emergency Blood Requests</h2>
            <p className="text-gray-600">Current requests that need immediate attention</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyRequests.map((request) => (
              <Card key={request.id} className={`
                overflow-hidden shadow-md hover:shadow-lg transition-shadow
                ${request.urgency === "Critical" ? "border-blood border-2" : ""}
              `}>
                <CardContent className="p-0">
                  <div className={`
                    py-3 px-4 text-white font-semibold flex justify-between items-center
                    ${request.urgency === "Critical" ? "bg-blood animate-pulse-urgent" : 
                      request.urgency === "Urgent" ? "bg-orange-500" : "bg-yellow-500"}
                  `}>
                    <span>{request.urgency}</span>
                    <span>{request.timePosted}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl font-bold text-blood">{request.bloodType}</div>
                      <Button asChild size="sm" className="bg-blood hover:bg-blood-dark">
                        <Link to={`/donate/${request.id}`}>Respond Now</Link>
                      </Button>
                    </div>
                    <div className="flex items-start mb-2">
                      <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{request.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-blood text-blood hover:bg-blood/5">
              <Link to="/find-donors">View All Requests</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-trust-dark mb-2">How RakthSetu Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to connect blood donors with those in need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-neutral rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Bell className="h-10 w-10 text-blood" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-trust-dark">Request Blood</h3>
              <p className="text-gray-600">
                Patients or hospitals can request for specific blood types needed urgently
              </p>
            </div>

            <div className="text-center">
              <div className="bg-neutral rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-10 w-10 text-blood" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-trust-dark">Find Nearby Donors</h3>
              <p className="text-gray-600">
                Our system notifies eligible donors in the vicinity about the emergency
              </p>
            </div>

            <div className="text-center">
              <div className="bg-neutral rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-blood" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-trust-dark">Save Lives</h3>
              <p className="text-gray-600">
                Donors respond and coordinate directly with the hospital to donate blood
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-10 bg-blood text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Donor CTA */}
      <section className="py-16 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-trust-dark mb-4">Become a Blood Donor Today</h2>
                <p className="text-gray-600 mb-6">
                  Your simple act of donating blood can save up to three lives. Join our network of
                  heroes and be notified when someone near you needs your help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-blood hover:bg-blood-dark">
                    <Link to="/donor-registration">Register as Donor</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-blood text-blood hover:bg-blood/5">
                    <Link to="/blood-education">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-r from-trust to-trust-dark p-8 md:p-12 flex flex-col justify-center text-white">
                <h3 className="text-2xl font-semibold mb-4">Why Your Donation Matters</h3>
                <ul className="space-y-3">
                  {[
                    "Every 2 seconds, someone needs blood",
                    "A single donation can save up to 3 lives",
                    "Only 3% of eligible people donate blood",
                    "Blood cannot be manufactured – it must be donated",
                    "Most donated red blood cells must be used within 42 days",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Heart className="h-5 w-5 text-red-300 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-trust-dark mb-2">Success Stories</h2>
            <p className="text-gray-600">Hear from those who have been impacted by blood donations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex flex-col h-full">
                <p className="text-gray-700 mb-4 flex-grow">
                  "My daughter needed an emergency blood transfusion after a serious accident. 
                  Thanks to RakthSetu, we found donors within minutes. Three people showed up 
                  at the hospital. I can't express how grateful we are for this service and the donors."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-neutral flex items-center justify-center">
                      <User className="h-6 w-6 text-blood" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-trust-dark font-semibold">Priya Sharma</h4>
                    <p className="text-sm text-gray-500">Delhi</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex flex-col h-full">
                <p className="text-gray-700 mb-4 flex-grow">
                  "As a regular donor, I've been part of RakthSetu for over a year. The platform
                  makes it so easy to help others. I've donated twice in emergency situations, 
                  and knowing that my blood directly saved someone's life is the most rewarding feeling."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-neutral flex items-center justify-center">
                      <User className="h-6 w-6 text-blood" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-trust-dark font-semibold">Rahul Patel</h4>
                    <p className="text-sm text-gray-500">Mumbai</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
