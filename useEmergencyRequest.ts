
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

// Define the blood group type based on the database enum
type BloodGroupType = Database["public"]["Enums"]["blood_group_type"];

export type EmergencyRequestFormData = {
  patientName: string;
  contactPerson: string;
  contactNumber: string;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  bloodGroup: BloodGroupType;
  unitsNeeded: string;
  urgencyLevel: "critical" | "urgent" | "moderate";
  requiredBy: string;
  additionalInfo?: string;
};

export const useEmergencyRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const submitEmergencyRequest = async (formData: EmergencyRequestFormData) => {
    setIsLoading(true);
    
    try {
      // Get the current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to submit an emergency request",
          variant: "destructive",
        });
        return false;
      }
      
      // Insert into emergency_requests table
      const { data, error } = await supabase
        .from("emergency_requests")
        .insert({
          patient_name: formData.patientName,
          contact_name: formData.contactPerson,
          contact_phone: formData.contactNumber,
          hospital_name: formData.hospitalName,
          hospital_address: formData.hospitalAddress,
          city: formData.city,
          state: "", // Assuming state is not included in the form
          blood_group: formData.bloodGroup, // Now this is properly typed
          units_needed: parseInt(formData.unitsNeeded),
          urgency_level: formData.urgencyLevel,
          additional_info: formData.additionalInfo || null,
          status: "active",
          requester_id: user.id,
        })
        .select();
      
      if (error) {
        console.error("Error submitting emergency request:", error);
        toast({
          title: "Submission Failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      // Create a notification for the requester
      await supabase
        .from("notifications")
        .insert({
          user_id: user.id,
          title: "Emergency Request Submitted",
          message: `Your emergency request for ${formData.bloodGroup} blood has been submitted successfully.`,
          type: "emergency_request",
          related_request_id: data[0].id,
        });
      
      // Find matching donors in the same city with the same blood type
      const { data: matchingDonors } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .eq("blood_group", formData.bloodGroup)
        .eq("city", formData.city);
      
      // Create notifications for matching donors
      if (matchingDonors && matchingDonors.length > 0) {
        const donorNotifications = matchingDonors.map((donor) => ({
          user_id: donor.id,
          title: "Urgent: Blood Donation Needed",
          message: `A ${formData.urgencyLevel} request for ${formData.bloodGroup} blood has been made in your city.`,
          type: "donor_match",
          related_request_id: data[0].id,
        }));
        
        await supabase.from("notifications").insert(donorNotifications);
      }
      
      toast({
        title: "Request Submitted!",
        description: "Your emergency blood request has been sent to potential donors in your area.",
      });
      
      return true;
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    submitEmergencyRequest,
    isLoading,
  };
};
