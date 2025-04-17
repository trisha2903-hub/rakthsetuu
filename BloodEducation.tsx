import { useState } from "react";
import { Heart, Droplet, HelpCircle, Clock, AlertCircle, Award, MapPin, Info, CupSoda, Wifi } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BloodIcon from "@/components/icons/BloodIcon";

const BloodEducation = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("apos");

  const bloodCompatibility = {
    apos: {
      canDonateTo: ["A+", "AB+"],
      canReceiveFrom: ["A+", "A-", "O+", "O-"],
      percentage: "35.7%",
    },
    aneg: {
      canDonateTo: ["A+", "A-", "AB+", "AB-"],
      canReceiveFrom: ["A-", "O-"],
      percentage: "6.3%",
    },
    bpos: {
      canDonateTo: ["B+", "AB+"],
      canReceiveFrom: ["B+", "B-", "O+", "O-"],
      percentage: "8.5%",
    },
    bneg: {
      canDonateTo: ["B+", "B-", "AB+", "AB-"],
      canReceiveFrom: ["B-", "O-"],
      percentage: "1.5%",
    },
    abpos: {
      canDonateTo: ["AB+"],
      canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      percentage: "3.4%",
    },
    abneg: {
      canDonateTo: ["AB+", "AB-"],
      canReceiveFrom: ["A-", "B-", "AB-", "O-"],
      percentage: "0.6%",
    },
    opos: {
      canDonateTo: ["O+", "A+", "B+", "AB+"],
      canReceiveFrom: ["O+", "O-"],
      percentage: "37.4%",
    },
    oneg: {
      canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      canReceiveFrom: ["O-"],
      percentage: "6.6%",
    },
  };

  const mythsAndFacts = [
    {
      myth: "Blood donation makes you weak permanently.",
      fact: "Your body replenishes the fluid lost during donation within 24 hours, and red blood cells within 4-6 weeks. Regular donors often report feeling healthier.",
    },
    {
      myth: "Blood donation is painful.",
      fact: "The only pain involved is a slight pinch of the needle during insertion, which lasts only a second. Most donors report the process as painless and comfortable.",
    },
    {
      myth: "Donors can contract diseases from donating blood.",
      fact: "All equipment used for blood collection is sterile, used only once, and then discarded. There is absolutely no risk of contracting any disease from donating blood.",
    },
    {
      myth: "People with diabetes or high blood pressure cannot donate blood.",
      fact: "People with controlled diabetes or hypertension, who are on medication, can donate blood if their condition is well managed and they feel healthy.",
    },
    {
      myth: "You can't exercise after donating blood.",
      fact: "It's recommended to avoid strenuous physical activity for 24 hours after donation, but normal activities can be resumed after a short rest period.",
    },
  ];

  const eligibilityCriteria = [
    {
      criteria: "Age",
      requirement: "Between 18 and 65 years",
      note: "Some regions may permit 16-17 years with parental consent",
    },
    {
      criteria: "Weight",
      requirement: "At least 50 kg (110 lbs)",
      note: "For your own safety during donation",
    },
    {
      criteria: "Health Status",
      requirement: "Generally good health",
      note: "No fever, cold, or infection on day of donation",
    },
    {
      criteria: "Time Since Last Donation",
      requirement: "At least 3 months for whole blood",
      note: "56 days is the standard waiting period in most countries",
    },
    {
      criteria: "Hemoglobin Levels",
      requirement: "12.5 g/dL for women, 13.0 g/dL for men",
      note: "Will be tested before donation",
    },
    {
      criteria: "Pregnancy/Breastfeeding",
      requirement: "Wait 6 months after pregnancy, can donate while breastfeeding",
      note: "If mother and baby are healthy",
    },
    {
      criteria: "Medications",
      requirement: "Many medications are acceptable",
      note: "Inform staff about all medications during screening",
    },
  ];

  const donationProcess = [
    {
      title: "Registration",
      description: "You'll need to show identification and complete a donor registration form.",
      icon: UserIcon,
    },
    {
      title: "Health History",
      description: "You'll answer questions about your health history and travel to ensure donation safety.",
      icon: HelpCircle,
    },
    {
      title: "Mini Physical",
      description: "Your temperature, pulse, blood pressure, and hemoglobin levels will be checked.",
      icon: Heart,
    },
    {
      title: "The Donation",
      description: "The actual donation takes about 8-10 minutes, during which about 450ml of blood is collected.",
      icon: Droplet,
    },
    {
      title: "Refreshment",
      description: "After donating, you'll be provided with refreshments to help your body replenish fluids.",
      icon: CoffeeIcon,
    },
    {
      title: "Rest",
      description: "You should rest for at least 15 minutes before leaving and avoid strenuous activity for 24 hours.",
      icon: Clock,
    },
  ];

  const bloodFacts = [
    "Every two seconds, someone needs blood.",
    "A single car accident victim can require up to 100 units of blood.",
    "One donation can save up to three lives.",
    "Blood cannot be manufactured – it can only come from donors.",
    "Red blood cells can be stored for 42 days.",
    "Platelets must be used within 5 days of donation.",
    "Type O negative blood can be transfused to patients of all blood types.",
    "Type AB positive individuals can receive blood from any blood type.",
    "Less than 38% of the population is eligible to donate blood.",
    "The average adult has about 5 liters of blood in their body.",
    "Your body replenishes the plasma from your blood within 24 hours.",
    "It takes about 4-6 weeks to regenerate red blood cells after donation.",
  ];

  const bloodFAQs = [
    {
      question: "How often can I donate blood?",
      answer: "Most healthy adults can donate whole blood every 56 days (8 weeks). If you donate platelets, you can give every 7 days up to 24 times a year. For plasma, you can donate every 28 days and up to 13 times a year."
    },
    {
      question: "Does blood donation hurt?",
      answer: "Most people feel only a slight pinch when the needle is inserted. The actual donation process is usually painless. Some donors might experience mild discomfort, but it typically subsides quickly."
    },
    {
      question: "How long does blood donation take?",
      answer: "The entire process takes about 1 hour, which includes registration, health history, mini-physical, the donation itself (which takes 8-10 minutes), and refreshments afterward. The actual blood draw only takes about 8-10 minutes."
    },
    {
      question: "How much blood is taken during donation?",
      answer: "A typical whole blood donation is approximately 450-500 ml, which is about 1 pint or 10% of your total blood volume. Your body replaces the fluid in 24 hours and the red cells within 4-6 weeks."
    },
    {
      question: "What should I eat before donating blood?",
      answer: "It's recommended to eat a healthy, low-fat meal within 2-3 hours before donating. Include iron-rich foods like lean meat, beans, or spinach. Stay well-hydrated by drinking plenty of fluids, especially water, before and after donation."
    },
    {
      question: "Can I exercise after donating blood?",
      answer: "It's best to avoid strenuous physical activity or heavy lifting for at least 24 hours after blood donation. Light exercise is generally fine after a few hours, but listen to your body and rest if you feel dizzy or fatigued."
    },
    {
      question: "What happens to my blood after donation?",
      answer: "After collection, your blood is tested for infectious diseases and blood type. It is then processed into components (red cells, platelets, plasma) and distributed to hospitals where it helps patients in need."
    },
    {
      question: "Can I donate if I have high blood pressure or diabetes?",
      answer: "People with controlled high blood pressure or type 2 diabetes can usually donate blood if their condition is well-managed with medication. You'll be assessed during the pre-donation screening to determine eligibility."
    },
    {
      question: "Can I donate blood while on medication?",
      answer: "Many medications are acceptable for blood donation. Common medications like those for blood pressure, cholesterol, or birth control usually don't disqualify you. However, some medications may require a waiting period. Always inform the staff about all medications during screening."
    },
    {
      question: "How will I feel after donating blood?",
      answer: "Most donors feel fine after donation. Some may experience mild fatigue, lightheadedness, or arm soreness. These symptoms typically resolve quickly with rest, hydration, and a light snack."
    }
  ];

  const bloodGroupCompatibilityChart = [
    { 
      bloodType: "A+", 
      canReceiveFrom: ["A+", "A-", "O+", "O-"],
      canDonateTo: ["A+", "AB+"],
      population: "35.7%",
      notes: "Second most common blood type"
    },
    { 
      bloodType: "A-", 
      canReceiveFrom: ["A-", "O-"],
      canDonateTo: ["A+", "A-", "AB+", "AB-"],
      population: "6.3%",
      notes: "Universal plasma donor"
    },
    { 
      bloodType: "B+", 
      canReceiveFrom: ["B+", "B-", "O+", "O-"],
      canDonateTo: ["B+", "AB+"],
      population: "8.5%",
      notes: "More common in Asian populations"
    },
    { 
      bloodType: "B-", 
      canReceiveFrom: ["B-", "O-"],
      canDonateTo: ["B+", "B-", "AB+", "AB-"],
      population: "1.5%",
      notes: "One of the rarer blood types"
    },
    { 
      bloodType: "AB+", 
      canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      canDonateTo: ["AB+"],
      population: "3.4%",
      notes: "Universal recipient for red blood cells"
    },
    { 
      bloodType: "AB-", 
      canReceiveFrom: ["A-", "B-", "AB-", "O-"],
      canDonateTo: ["AB+", "AB-"],
      population: "0.6%",
      notes: "The rarest blood type"
    },
    { 
      bloodType: "O+", 
      canReceiveFrom: ["O+", "O-"],
      canDonateTo: ["O+", "A+", "B+", "AB+"],
      population: "37.4%",
      notes: "Most common blood type"
    },
    { 
      bloodType: "O-", 
      canReceiveFrom: ["O-"],
      canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      population: "6.6%",
      notes: "Universal donor for red blood cells"
    }
  ];

  const BloodTypeSelector = ({ onSelect }) => {
    return (
      <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
        {[
          { id: "apos", label: "A+" },
          { id: "aneg", label: "A-" },
          { id: "bpos", label: "B+" },
          { id: "bneg", label: "B-" },
          { id: "abpos", label: "AB+" },
          { id: "abneg", label: "AB-" },
          { id: "opos", label: "O+" },
          { id: "oneg", label: "O-" },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`
              rounded-lg py-3 font-bold transition-colors
              ${
                selectedBloodType === type.id
                  ? "bg-blood text-white shadow-md"
                  : "bg-neutral hover:bg-neutral-dark text-gray-700"
              }
            `}
          >
            {type.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <section className="bg-gradient-to-r from-blood to-blood-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blood Education Center</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Learn about blood types, donation process, eligibility, and the importance of blood donation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="compatibility" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="compatibility">Blood Compatibility</TabsTrigger>
              <TabsTrigger value="myths">Myths & Facts</TabsTrigger>
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="process">Donation Process</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="compatibility" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Type Compatibility Chart</CardTitle>
                  <CardDescription>
                    Select your blood type to see compatibility information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BloodTypeSelector onSelect={setSelectedBloodType} />

                  <div className="bg-neutral p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blood mb-2">
                          {selectedBloodType.slice(0, -2).toUpperCase()}
                          {selectedBloodType.endsWith("pos") ? "+" : "-"}
                        </div>
                        <div className="text-gray-500 mb-4">
                          {bloodCompatibility[selectedBloodType].percentage} of population
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-trust-dark mb-2 flex items-center">
                          <Droplet className="h-5 w-5 text-blood mr-2" />
                          Can Donate To:
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                          {bloodCompatibility[selectedBloodType].canDonateTo.map((type) => (
                            <div
                              key={type}
                              className="bg-green-100 text-green-800 rounded-md py-1 px-2 text-center font-medium"
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-trust-dark mb-2 flex items-center">
                          <Droplet className="h-5 w-5 text-blood mr-2" />
                          Can Receive From:
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                          {bloodCompatibility[selectedBloodType].canReceiveFrom.map((type) => (
                            <div
                              key={type}
                              className="bg-blue-100 text-blue-800 rounded-md py-1 px-2 text-center font-medium"
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-trust-dark mb-4">Complete Blood Group Compatibility Chart</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Blood Type</TableHead>
                            <TableHead>Can Donate To</TableHead>
                            <TableHead>Can Receive From</TableHead>
                            <TableHead>Population %</TableHead>
                            <TableHead>Notes</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bloodGroupCompatibilityChart.map((group) => (
                            <TableRow key={group.bloodType}>
                              <TableCell className="font-medium flex items-center">
                                <BloodIcon className="h-4 w-4 text-blood mr-2" />
                                {group.bloodType}
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {group.canDonateTo.map((type) => (
                                    <span key={type} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                      {type}
                                    </span>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-wrap gap-1">
                                  {group.canReceiveFrom.map((type) => (
                                    <span key={type} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                      {type}
                                    </span>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell>{group.population}</TableCell>
                              <TableCell>{group.notes}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-trust-dark mb-4">Understanding Blood Types</h3>
                    <p className="text-gray-700 mb-4">
                      Blood types are determined by the presence or absence of certain antigens on the surface of red blood cells.
                      The ABO system classifies blood into four types: A, B, AB, and O. Additionally, the Rhesus (Rh) factor,
                      either positive (+) or negative (-), further categorizes blood into eight common types.
                    </p>
                    <p className="text-gray-700">
                      It's crucial to match blood types for transfusions because incompatible blood can cause a severe,
                      potentially fatal immune response. O negative, known as the universal donor, can typically be transfused
                      to anyone, while AB positive individuals can receive any ABO blood type.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="myths" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Donation: Myths vs. Facts</CardTitle>
                  <CardDescription>
                    Common misconceptions about blood donation debunked
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mythsAndFacts.map((item, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start mb-2">
                          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <h3 className="font-semibold text-gray-800">Myth: {item.myth}</h3>
                        </div>
                        <div className="flex items-start ml-7">
                          <div className="h-5 w-5 bg-green-500 rounded-full text-white flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                            ✓
                          </div>
                          <h3 className="font-semibold text-gray-800">Fact: {item.fact}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Did You Know?</CardTitle>
                  <CardDescription>
                    Interesting facts about blood and blood donation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bloodFacts.map((fact, index) => (
                      <div
                        key={index}
                        className="bg-neutral rounded-lg p-4 flex items-start"
                      >
                        <Droplet className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{fact}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="eligibility" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Donation Eligibility Criteria</CardTitle>
                  <CardDescription>
                    General guidelines for blood donors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-neutral">
                          <th className="border px-4 py-2 text-left text-trust-dark">Criteria</th>
                          <th className="border px-4 py-2 text-left text-trust-dark">Requirement</th>
                          <th className="border px-4 py-2 text-left text-trust-dark">Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eligibilityCriteria.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-neutral/50"}>
                            <td className="border px-4 py-3 font-medium">{item.criteria}</td>
                            <td className="border px-4 py-3">{item.requirement}</td>
                            <td className="border px-4 py-3 text-gray-600">{item.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-yellow-800 mb-1">Important Note</h3>
                        <p className="text-yellow-700 text-sm">
                          These are general guidelines. Specific eligibility criteria may vary based on location, blood bank
                          policies, and current health conditions. A thorough screening will be conducted before donation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-trust-dark mb-4">Temporary Deferrals</h3>
                    <p className="text-gray-700 mb-4">
                      You may be temporarily deferred from donating blood if you:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Have a cold, flu, or other infection (until recovery)</li>
                      <li>Recently received certain vaccinations (varies by vaccine)</li>
                      <li>Recently traveled to certain countries (malaria risk areas)</li>
                      <li>Had a tattoo or piercing in the last 3-12 months (varies by location)</li>
                      <li>Had a recent dental procedure (typically 24-72 hours)</li>
                      <li>Are pregnant or have recently given birth (6 months wait)</li>
                      <li>Recently had surgery (wait period depends on the procedure)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="process" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>The Blood Donation Process</CardTitle>
                  <CardDescription>
                    What to expect when donating blood
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      {donationProcess.map((step, index) => (
                        <div key={index} className="relative pl-20 pb-8 last:pb-0">
                          <div className="absolute left-6 -translate-x-1/2 bg-blood rounded-full h-5 w-5 z-10"></div>
                          <div className="absolute left-0 top-0 rounded-full bg-neutral w-16 h-16 flex items-center justify-center">
                            <step.icon className="h-8 w-8 text-blood" />
                          </div>
                          <h3 className="text-lg font-semibold text-trust-dark mb-2">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-neutral p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-trust-dark mb-4">Before Donation</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Clock className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Get a good night's sleep before donating</span>
                        </li>
                        <li className="flex items-start">
                          <Heart className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Eat a healthy meal within 3 hours of donation</span>
                        </li>
                        <li className="flex items-start">
                          <CupIcon className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Drink plenty of water before and after donating</span>
                        </li>
                        <li className="flex items-start">
                          <Award className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Bring identification and list of medications you take</span>
                        </li>
                        <li className="flex items-start">
                          <MapPin className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Wear comfortable clothing with sleeves that can be rolled up</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-neutral p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-trust-dark mb-4">After Donation</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Clock className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Rest for at least 15 minutes and have a snack</span>
                        </li>
                        <li className="flex items-start">
                          <CupIcon className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Increase fluid intake for the next 24-48 hours</span>
                        </li>
                        <li className="flex items-start">
                          <BanIcon className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Avoid strenuous physical activity for 24 hours</span>
                        </li>
                        <li className="flex items-start">
                          <WineIcon className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Avoid alcohol consumption for 24 hours</span>
                        </li>
                        <li className="flex items-start">
                          <Heart className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">Keep the bandage on for at least 4-5 hours</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faqs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions About Blood Donation</CardTitle>
                  <CardDescription>
                    Common questions and answers about blood donation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {bloodFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-start">
                            <HelpCircle className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                            <span>{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-7">
                          <div className="flex items-start">
                            <Info className="h-5 w-5 text-trust-dark mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <div className="mt-8 bg-neutral p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-trust-dark mb-4 flex items-center">
                      <BloodIcon className="h-5 w-5 text-blood mr-2" />
                      Benefits of Blood Donation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-semibold text-trust-dark mb-2">Health Benefits</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <Heart className="h-4 w-4 text-blood mr-2 flex-shrink-0 mt-1" />
                            <span>Reduces the risk of heart and liver diseases</span>
                          </li>
                          <li className="flex items-start">
                            <Heart className="h-4 w-4 text-blood mr-2 flex-shrink-0 mt-1" />
                            <span>Stimulates blood cell production</span>
                          </li>
                          <li className="flex items-start">
                            <Heart className="h-4 w-4 text-blood mr-2 flex-shrink-0 mt-1" />
                            <span>Reveals potential health issues through screening</span>
                          </li>
                          <li className="flex items-start">
                            <Heart className="h-4 w-4 text-blood mr-2 flex-shrink-0 mt-1" />
                            <span>Burns calories (about 650 kcal per donation)</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-semibold text-trust-dark mb-2">Social Benefits</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <UserIcon className="h-4 w-4 text-blood mr-2 flex-shrink-0 mt-1" />
                            <span>Helps save up to three lives with one donation</span>
                          </li>
                          <li className="flex items-start">
                            <UserIcon className="h-4 w-4 text-blood mr-2 flex-shrink-0 mt-1" />
                            <span>Supports patients undergoing major surgeries</span>
                          </li>
                          <li className="flex items-start">
                            <UserIcon className="h-4 w-4 text-blood mr-2 flex-shrink-0 mt-1" />
                            <span>Assists cancer patients during treatment</span>
                          </li>
                          <li className="flex items-start">
                            <UserIcon className="h-4 w-4 text-blood mr-2 flex-shrink-0 mt-1" />
                            <span>Helps accident victims and those with blood disorders</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

const UserIcon = ({ className }) => <div className={className}>👤</div>;
const CoffeeIcon = ({ className }) => <div className={className}>☕</div>;
const CupIcon = ({ className }) => <div className={className}>🥤</div>;
const BanIcon = ({ className }) => <div className={className}>🚫</div>;
const WineIcon = ({ className }) => <div className={className}>🍷</div>;

export default BloodEducation;
