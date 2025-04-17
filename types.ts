export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      donations: {
        Row: {
          blood_group: Database["public"]["Enums"]["blood_group_type"]
          city: string
          created_at: string
          donation_center: string
          donation_date: string
          donor_id: string
          emergency_request_id: string | null
          id: string
          state: string
          units_donated: number
        }
        Insert: {
          blood_group: Database["public"]["Enums"]["blood_group_type"]
          city: string
          created_at?: string
          donation_center: string
          donation_date: string
          donor_id: string
          emergency_request_id?: string | null
          id?: string
          state: string
          units_donated?: number
        }
        Update: {
          blood_group?: Database["public"]["Enums"]["blood_group_type"]
          city?: string
          created_at?: string
          donation_center?: string
          donation_date?: string
          donor_id?: string
          emergency_request_id?: string | null
          id?: string
          state?: string
          units_donated?: number
        }
        Relationships: [
          {
            foreignKeyName: "donations_emergency_request_id_fkey"
            columns: ["emergency_request_id"]
            isOneToOne: false
            referencedRelation: "emergency_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      emergency_requests: {
        Row: {
          additional_info: string | null
          blood_group: Database["public"]["Enums"]["blood_group_type"]
          city: string
          contact_name: string
          contact_phone: string
          created_at: string
          hospital_address: string
          hospital_name: string
          id: string
          patient_name: string
          requester_id: string
          state: string
          status: string
          units_needed: number
          updated_at: string
          urgency_level: string
        }
        Insert: {
          additional_info?: string | null
          blood_group: Database["public"]["Enums"]["blood_group_type"]
          city: string
          contact_name: string
          contact_phone: string
          created_at?: string
          hospital_address: string
          hospital_name: string
          id?: string
          patient_name: string
          requester_id: string
          state: string
          status?: string
          units_needed: number
          updated_at?: string
          urgency_level: string
        }
        Update: {
          additional_info?: string | null
          blood_group?: Database["public"]["Enums"]["blood_group_type"]
          city?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string
          hospital_address?: string
          hospital_name?: string
          id?: string
          patient_name?: string
          requester_id?: string
          state?: string
          status?: string
          units_needed?: number
          updated_at?: string
          urgency_level?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          related_request_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          related_request_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          related_request_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_request_id_fkey"
            columns: ["related_request_id"]
            isOneToOne: false
            referencedRelation: "emergency_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number
          blood_group: Database["public"]["Enums"]["blood_group_type"]
          city: string
          created_at: string
          email: string
          full_name: string
          gender: string
          hide_contact_info: boolean
          id: string
          last_donation_date: string | null
          phone: string
          state: string
          updated_at: string
        }
        Insert: {
          age: number
          blood_group: Database["public"]["Enums"]["blood_group_type"]
          city: string
          created_at?: string
          email: string
          full_name: string
          gender: string
          hide_contact_info?: boolean
          id: string
          last_donation_date?: string | null
          phone: string
          state: string
          updated_at?: string
        }
        Update: {
          age?: number
          blood_group?: Database["public"]["Enums"]["blood_group_type"]
          city?: string
          created_at?: string
          email?: string
          full_name?: string
          gender?: string
          hide_contact_info?: boolean
          id?: string
          last_donation_date?: string | null
          phone?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      blood_group_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      blood_group_type: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
  },
} as const
