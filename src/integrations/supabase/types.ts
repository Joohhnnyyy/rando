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
      crop_recommendations: {
        Row: {
          created_at: string
          humidity: number
          id: string
          nitrogen: number
          ph_level: number
          phosphorus: number
          potassium: number
          rainfall: number
          recommended_crops: Json | null
          soil_type: string
          temperature: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          humidity: number
          id?: string
          nitrogen: number
          ph_level: number
          phosphorus: number
          potassium: number
          rainfall: number
          recommended_crops?: Json | null
          soil_type: string
          temperature: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          humidity?: number
          id?: string
          nitrogen?: number
          ph_level?: number
          phosphorus?: number
          potassium?: number
          rainfall?: number
          recommended_crops?: Json | null
          soil_type?: string
          temperature?: number
          user_id?: string | null
        }
        Relationships: []
      }
      crop_rotation_plans: {
        Row: {
          created_at: string
          field_data: Json
          id: string
          rotation_plan: Json | null
          soil_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          field_data: Json
          id?: string
          rotation_plan?: Json | null
          soil_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          field_data?: Json
          id?: string
          rotation_plan?: Json | null
          soil_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      fertilizer_recommendations: {
        Row: {
          created_at: string
          crop_type: string
          id: string
          nitrogen: number
          ph_level: number
          phosphorus: number
          potassium: number
          recommended_fertilizers: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          crop_type: string
          id?: string
          nitrogen: number
          ph_level: number
          phosphorus: number
          potassium: number
          recommended_fertilizers?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          crop_type?: string
          id?: string
          nitrogen?: number
          ph_level?: number
          phosphorus?: number
          potassium?: number
          recommended_fertilizers?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      government_scheme_checks: {
        Row: {
          created_at: string
          crop_type: string
          district: string
          eligible_schemes: Json | null
          has_livestock: boolean | null
          id: string
          landholding_size: number
          state: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          crop_type: string
          district: string
          eligible_schemes?: Json | null
          has_livestock?: boolean | null
          id?: string
          landholding_size: number
          state: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          crop_type?: string
          district?: string
          eligible_schemes?: Json | null
          has_livestock?: boolean | null
          id?: string
          landholding_size?: number
          state?: string
          user_id?: string | null
        }
        Relationships: []
      }
      irrigation_advice: {
        Row: {
          created_at: string
          crop_type: string
          growth_stage: string
          id: string
          irrigation_schedule: Json | null
          location: string
          soil_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          crop_type: string
          growth_stage: string
          id?: string
          irrigation_schedule?: Json | null
          location: string
          soil_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          crop_type?: string
          growth_stage?: string
          id?: string
          irrigation_schedule?: Json | null
          location?: string
          soil_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      pest_disease_predictions: {
        Row: {
          created_at: string
          crop_type: string | null
          id: string
          image_url: string | null
          location: string | null
          predicted_issue: Json | null
          symptoms: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          crop_type?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          predicted_issue?: Json | null
          symptoms?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          crop_type?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          predicted_issue?: Json | null
          symptoms?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      yield_predictions: {
        Row: {
          confidence_score: number | null
          created_at: string
          crop_type: string
          harvest_date: string
          id: string
          predicted_yield: number | null
          region: string
          sowing_date: string
          user_id: string | null
          weather_conditions: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          crop_type: string
          harvest_date: string
          id?: string
          predicted_yield?: number | null
          region: string
          sowing_date: string
          user_id?: string | null
          weather_conditions: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          crop_type?: string
          harvest_date?: string
          id?: string
          predicted_yield?: number | null
          region?: string
          sowing_date?: string
          user_id?: string | null
          weather_conditions?: string
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
      [_ in never]: never
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
    Enums: {},
  },
} as const
