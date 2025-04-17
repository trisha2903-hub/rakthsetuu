
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar, MapPin, User, Phone, Mail, Heart, Shield, Bell, Award } from "lucide-react";
import BloodIcon from "@/components/icons/BloodIcon";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// Form schema for donor registration
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  age: z.string().refine((val) => {
    const ageNum = parseInt(val);
    return ageNum >= 18 && ageNum <= 65;
  }, { message: "You must be between 18 and 65 years old to donate" }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender",
  }),
  bloodGroup: z.string({
    required_error: "Please select your blood group",
  }),
  lastDonation: z.string().optional(),
  city: z.string().min(2, { message: "Please enter your city" }),
  state: z.string().min(2, { message: "Please enter your state" }),
  hideContactInfo: z.boolean().default(false),
  healthDeclaration: z.boolean().refine((val) => val === true, {
    message: "You must declare that you are in good health",
  }),
});

const DonorRegistration = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      age: "",
      gender: "male",
      bloodGroup: "",
      lastDonation: "",
      city: "",
      state: "",
      hideContactInfo: false,
      healthDeclaration: false,
    },
  });

  const nextStep = async () => {
    // Manual form validation for current step fields
    let isValid = false;

    if (step === 1) {
      isValid = await form.trigger(['fullName', 'email', 'phone', 'age', 'gender']);
    } else if (step === 2) {
      isValid = await form.trigger(['bloodGroup', 'lastDonation', 'city', 'state']);
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would send data to your API
    console.log("Form submitted successfully with values:", values);
    
    toast({
      title: "Registration Successful!",
      description: "Thank you for registering as a blood donor. You're now a life-saver!",
    });
    
    // Reset form after successful submission
    form.reset();
    setStep(1);
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <MainLayout>
      <section className="py-10 bg-neutral">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-trust-dark">Become a Blood Donor</h1>
            <p className="text-gray-600 mt-2">Join our network of life-savers</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-0">
              {/* Progress bar */}
              <div className="bg-white px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center text-white ${step >= 1 ? 'bg-blood' : 'bg-gray-300'}`}>
                      <User className="h-5 w-5" />
                    </div>
                    <div className={`h-1 w-10 ${step >= 2 ? 'bg-blood' : 'bg-gray-200'}`}></div>
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center text-white ${step >= 2 ? 'bg-blood' : 'bg-gray-300'}`}>
                      <BloodIcon className="h-5 w-5" />
                    </div>
                    <div className={`h-1 w-10 ${step >= 3 ? 'bg-blood' : 'bg-gray-200'}`}></div>
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center text-white ${step >= 3 ? 'bg-blood' : 'bg-gray-300'}`}>
                      <Shield className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Step {step} of 3
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {step === 1 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-trust-dark">Personal Information</h2>
                        
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="10-digit mobile number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                  <Input type="number" min="18" max="65" placeholder="Age (18-65)" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-4"
                                  >
                                    <FormItem className="flex items-center space-x-2">
                                      <FormControl>
                                        <RadioGroupItem value="male" />
                                      </FormControl>
                                      <FormLabel className="cursor-pointer">Male</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2">
                                      <FormControl>
                                        <RadioGroupItem value="female" />
                                      </FormControl>
                                      <FormLabel className="cursor-pointer">Female</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2">
                                      <FormControl>
                                        <RadioGroupItem value="other" />
                                      </FormControl>
                                      <FormLabel className="cursor-pointer">Other</FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    
                    {step === 2 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-trust-dark">Blood & Location Details</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="bloodGroup"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Blood Group</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select your blood group" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {bloodGroups.map((group) => (
                                      <SelectItem key={group} value={group}>
                                        {group}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="lastDonation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Donation Date (if any)</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your city" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your state" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="hideContactInfo"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Privacy Settings</FormLabel>
                                <p className="text-sm text-muted-foreground">
                                  Hide your contact information from public view
                                </p>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {step === 3 && (
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-trust-dark">Health Declaration</h2>
                        
                        <div className="rounded-lg border p-4 bg-neutral/50">
                          <h3 className="font-medium mb-2">Donor Eligibility Criteria</h3>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <Heart className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                              <span>Be in good health and feeling well</span>
                            </li>
                            <li className="flex items-start">
                              <Calendar className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                              <span>Must be at least 18 years old</span>
                            </li>
                            <li className="flex items-start">
                              <Shield className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                              <span>Not donated blood in the last 3 months</span>
                            </li>
                            <li className="flex items-start">
                              <Shield className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                              <span>No fever, cold or infection in the last 7 days</span>
                            </li>
                            <li className="flex items-start">
                              <Shield className="h-5 w-5 text-blood mr-2 flex-shrink-0 mt-0.5" />
                              <span>No tattoo, ear/body piercing in the last 6 months</span>
                            </li>
                          </ul>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="healthDeclaration"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  I declare that I am in good health and meet the above eligibility criteria
                                </FormLabel>
                                <p className="text-sm text-muted-foreground">
                                  I agree to be contacted for blood donation in emergency cases
                                </p>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormMessage>{form.formState.errors.healthDeclaration?.message}</FormMessage>
                      </div>
                    )}
                    
                    <div className="flex justify-between pt-4">
                      {step > 1 && (
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Previous
                        </Button>
                      )}
                      
                      {step < 3 ? (
                        <Button type="button" onClick={nextStep} className="bg-blood hover:bg-blood-dark">
                          Next
                        </Button>
                      ) : (
                        <Button type="submit" className="bg-blood hover:bg-blood-dark">
                          Register as Donor
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-trust-dark mb-4">Benefits of Being a Blood Donor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-neutral rounded-full p-3 mr-4">
                  <Heart className="h-6 w-6 text-blood" />
                </div>
                <div>
                  <h4 className="font-medium text-trust-dark">Save Lives</h4>
                  <p className="text-sm text-gray-600">Your donation can save up to three lives</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-neutral rounded-full p-3 mr-4">
                  <Bell className="h-6 w-6 text-blood" />
                </div>
                <div>
                  <h4 className="font-medium text-trust-dark">Emergency Alerts</h4>
                  <p className="text-sm text-gray-600">Get notified when your blood type is needed nearby</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-neutral rounded-full p-3 mr-4">
                  <Award className="h-6 w-6 text-blood" />
                </div>
                <div>
                  <h4 className="font-medium text-trust-dark">Recognition</h4>
                  <p className="text-sm text-gray-600">Earn badges and certificates for your contributions</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-neutral rounded-full p-3 mr-4">
                  <MapPin className="h-6 w-6 text-blood" />
                </div>
                <div>
                  <h4 className="font-medium text-trust-dark">Local Impact</h4>
                  <p className="text-sm text-gray-600">Help people in your own community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DonorRegistration;
