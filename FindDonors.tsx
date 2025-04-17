
import { useState } from "react";
import { MapPin, Search, Filter, Phone, User, Calendar, ArrowRight } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Sample donor data
const sampleDonors = [
  {
    id: 1,
    name: "Vikram Singh",
    bloodType: "O+",
    location: "Delhi",
    distance: "2.4 km",
    lastDonated: "4 months ago",
    phone: "+91 98765 43210",
    donations: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    bloodType: "A-",
    location: "Gurgaon",
    distance: "5.7 km",
    lastDonated: "6 months ago",
    phone: "+91 87654 32109",
    donations: 3,
  },
  {
    id: 3,
    name: "Rahul Patel",
    bloodType: "B+",
    location: "Noida",
    distance: "8.2 km",
    lastDonated: "9 months ago",
    phone: "+91 76543 21098",
    donations: 7,
  },
  {
    id: 4,
    name: "Ananya Gupta",
    bloodType: "AB+",
    location: "Delhi",
    distance: "3.5 km",
    lastDonated: "Never donated",
    phone: "+91 65432 10987",
    donations: 0,
  },
  {
    id: 5,
    name: "Rajesh Kumar",
    bloodType: "O-",
    location: "Faridabad",
    distance: "12.8 km",
    lastDonated: "2 months ago",
    phone: "+91 54321 09876",
    donations: 12,
  },
  {
    id: 6,
    name: "Neha Verma",
    bloodType: "A+",
    location: "Delhi",
    distance: "4.1 km",
    lastDonated: "3 months ago",
    phone: "+91 43210 98765",
    donations: 4,
  },
];

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const FindDonors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");
  const [maxDistance, setMaxDistance] = useState(20);
  const [showFilters, setShowFilters] = useState(false);

  // Filter donors based on search criteria
  const filteredDonors = sampleDonors.filter((donor) => {
    // Filter by search term
    const matchesSearch =
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by blood group
    const matchesBloodGroup = selectedBloodGroup === "All" || donor.bloodType === selectedBloodGroup;

    // Filter by distance
    const donorDistance = parseFloat(donor.distance.split(" ")[0]);
    const matchesDistance = donorDistance <= maxDistance;

    return matchesSearch && matchesBloodGroup && matchesDistance;
  });

  return (
    <MainLayout>
      <section className="bg-gradient-to-r from-blood to-blood-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Find Blood Donors</h1>
            <p className="text-lg max-w-2xl mx-auto mb-6">
              Search for blood donors by location, blood type, and availability
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or location"
                  className="pl-10 bg-white/90 text-gray-900 placeholder:text-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-center mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>

              {showFilters && (
                <div className="bg-white/10 rounded-lg p-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Blood Group</label>
                      <Select value={selectedBloodGroup} onValueChange={setSelectedBloodGroup}>
                        <SelectTrigger className="bg-white/90 text-gray-900">
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          {bloodGroups.map((group) => (
                            <SelectItem key={group} value={group}>
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Maximum Distance: {maxDistance} km
                      </label>
                      <Slider
                        value={[maxDistance]}
                        min={1}
                        max={50}
                        step={1}
                        onValueChange={(value) => setMaxDistance(value[0])}
                        className="py-4"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-trust-dark mb-6">
            {filteredDonors.length} Donors Available
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <Card key={donor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center font-bold text-white
                          ${donor.bloodType.startsWith('A') ? 'bg-blue-600' :
                            donor.bloodType.startsWith('B') ? 'bg-green-600' :
                            donor.bloodType.startsWith('AB') ? 'bg-purple-600' : 'bg-red-600'}
                        `}>
                          {donor.bloodType}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-trust-dark">{donor.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {donor.location} • {donor.distance}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1 text-blood" />
                        <span>Last donated: {donor.lastDonated}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-1 text-blood" />
                        <span>Donations: {donor.donations}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1 text-blood" />
                        <a href={`tel:${donor.phone}`} className="text-sm text-gray-600 hover:text-blood">
                          {donor.phone}
                        </a>
                      </div>
                      <Button asChild variant="outline" size="sm" className="text-blood border-blood hover:bg-blood/5">
                        <a href={`tel:${donor.phone}`}>
                          Contact
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDonors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No donors match your search criteria</p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedBloodGroup("All");
                  setMaxDistance(20);
                }}
                variant="outline"
                className="border-blood text-blood hover:bg-blood/5"
              >
                Reset Filters
              </Button>
            </div>
          )}

          <div className="mt-10 text-center bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-trust-dark mb-4">
              Need blood urgently?
            </h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
              If you have an urgent requirement, you can create an emergency blood request that
              will notify all matching donors in your vicinity.
            </p>
            <Button asChild className="bg-blood hover:bg-blood-dark">
              <a href="/emergency-request">Create Emergency Request</a>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FindDonors;
