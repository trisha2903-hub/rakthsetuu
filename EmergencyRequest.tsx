
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import MainLayout from "@/components/layout/MainLayout";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, DropletIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEmergencyRequest, EmergencyRequestFormData } from "@/hooks/useEmergencyRequest";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Database } from "@/integrations/supabase/types";

// Define blood group type based on the database enum
type BloodGroupType = Database["public"]["Enums"]["blood_group_type"];

// Form schema for emergency request
const formSchema = z.object({
  patientName: z.string().min(2, { message: "Patient name is required" }),
  contactPerson: z.string().min(2, { message: "Contact person is required" }),
  contactNumber: z.string().min(10, { message: "Valid contact number is required" }),
  hospitalName: z.string().min(3, { message: "Hospital name is required" }),
  hospitalAddress: z.string().min(10, { message: "Hospital address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] as [BloodGroupType, ...BloodGroupType[]]),
  unitsNeeded: z.string().min(1, { message: "Number of units is required" }),
  urgencyLevel: z.enum(["critical", "urgent", "moderate"], {
    required_error: "Urgency level is required",
  }),
  requiredBy: z.string().min(1, { message: "Required by date is required" }),
  additionalInfo: z.string().optional(),
});

const EmergencyRequest = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { submitEmergencyRequest, isLoading } = useEmergencyRequest();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to submit an emergency blood request.",
          variant: "destructive",
        });
        navigate("/login", { state: { returnUrl: "/emergency-request" } });
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      contactPerson: "",
      contactNumber: "",
      hospitalName: "",
      hospitalAddress: "",
      city: "",
      bloodGroup: "O+" as BloodGroupType,
      unitsNeeded: "1",
      urgencyLevel: "urgent",
      requiredBy: "",
      additionalInfo: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit an emergency blood request.",
        variant: "destructive",
      });
      return;
    }
    
    // Transform the data for the hook
    const requestData: EmergencyRequestFormData = {
      patientName: values.patientName,
      contactPerson: values.contactPerson,
      contactNumber: values.contactNumber,
      hospitalName: values.hospitalName,
      hospitalAddress: values.hospitalAddress,
      city: values.city,
      bloodGroup: values.bloodGroup,
      unitsNeeded: values.unitsNeeded,
      urgencyLevel: values.urgencyLevel,
      requiredBy: values.requiredBy,
      additionalInfo: values.additionalInfo,
    };
    
    const success = await submitEmergencyRequest(requestData);
    
    if (success) {
      // Reset form after successful submission
      form.reset();
    }
  };

  // List of blood groups matched to the database enum type
  const bloodGroups: BloodGroupType[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <MainLayout>
      <div className="py-12 bg-neutral">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <DropletIcon className="h-12 w-12 text-blood mx-auto mb-2" />
              <h1 className="text-2xl font-bold text-trust-dark">Emergency Blood Request</h1>
              <p className="text-gray-600">
                Request blood for emergency situations. We'll notify matching donors in your area immediately.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="patientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter patient name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Group</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select blood group" />
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
                    name="unitsNeeded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Units Needed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select units" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((unit) => (
                              <SelectItem key={unit} value={unit.toString()}>
                                {unit} {unit === 1 ? "unit" : "units"}
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
                    name="urgencyLevel"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Urgency Level</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="critical" className="text-red-600" />
                              </FormControl>
                              <FormLabel className="text-red-600 font-medium">Critical</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="urgent" className="text-orange-500" />
                              </FormControl>
                              <FormLabel className="text-orange-500 font-medium">Urgent</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="moderate" className="text-yellow-500" />
                              </FormControl>
                              <FormLabel className="text-yellow-500 font-medium">Moderate</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="requiredBy"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Required By</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(new Date(field.value), "PPP")
                                ) : (
                                  <span>Select a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ? new Date(field.value) : undefined}
                              onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person</FormLabel>
                        <FormControl>
                          <Input placeholder="Name of contact person" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hospitalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter hospital name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hospitalAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hospital Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter hospital address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any additional details about the patient or requirement"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include any relevant medical information that might help donors.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="bg-blood hover:bg-blood-dark w-full md:w-auto" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Emergency Request"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmergencyRequest;
