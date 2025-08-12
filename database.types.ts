export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      athlete_progress: {
        Row: {
          athlete_id: number
          comments: string | null
          created_at: string
          date: string
          id: number
          scores: Json
        }
        Insert: {
          athlete_id: number
          comments?: string | null
          created_at?: string
          date: string
          id?: number
          scores: Json
        }
        Update: {
          athlete_id?: number
          comments?: string | null
          created_at?: string
          date?: string
          id?: number
          scores?: Json
        }
        Relationships: [
          {
            foreignKeyName: "athlete_progress_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      athletes: {
        Row: {
          branch: Database["public"]["Enums"]["branch"]
          created_at: string
          dob: string
          email: string | null
          first_name: string
          id: number
          last_name: string
          phone: string | null
        }
        Insert: {
          branch: Database["public"]["Enums"]["branch"]
          created_at?: string
          dob: string
          email?: string | null
          first_name: string
          id?: number
          last_name: string
          phone?: string | null
        }
        Update: {
          branch?: Database["public"]["Enums"]["branch"]
          created_at?: string
          dob?: string
          email?: string | null
          first_name?: string
          id?: number
          last_name?: string
          phone?: string | null
        }
        Relationships: []
      }
      bkash_tokens: {
        Row: {
          created_at: string
          expires_at: number | null
          id_token: string
          refresh_token: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: number | null
          id_token: string
          refresh_token?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: number | null
          id_token?: string
          refresh_token?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: string
          athlete_name: string | null
          bkash_payment_id: string | null
          bkash_transaction_id: string | null
          branch: Database["public"]["Enums"]["branch"]
          created_at: string
          email: string
          id: number
          method: Database["public"]["Enums"]["payment_method"]
          payment_status: Database["public"]["Enums"]["PAYMENT_STATUS"]
        }
        Insert: {
          amount: string
          athlete_name?: string | null
          bkash_payment_id?: string | null
          bkash_transaction_id?: string | null
          branch: Database["public"]["Enums"]["branch"]
          created_at?: string
          email: string
          id?: number
          method: Database["public"]["Enums"]["payment_method"]
          payment_status: Database["public"]["Enums"]["PAYMENT_STATUS"]
        }
        Update: {
          amount?: string
          athlete_name?: string | null
          bkash_payment_id?: string | null
          bkash_transaction_id?: string | null
          branch?: Database["public"]["Enums"]["branch"]
          created_at?: string
          email?: string
          id?: number
          method?: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["PAYMENT_STATUS"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      user_athletes: {
        Row: {
          athlete_id: number
          created_at: string
          user_id: string
        }
        Insert: {
          athlete_id: number
          created_at?: string
          user_id: string
        }
        Update: {
          athlete_id?: number
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_athletes_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_secret: {
        Args: { secret_name: string }
        Returns: string
      }
    }
    Enums: {
      branch: "UTTARA_IHSB" | "BASHUNDHARA_SG" | "100FT_HGT"
      payment_method: "BKASH" | "CASH"
      PAYMENT_STATUS: "IN_PROGRESS" | "COMPLETE" | "FAILED"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      branch: ["UTTARA_IHSB", "BASHUNDHARA_SG", "100FT_HGT"],
      payment_method: ["BKASH", "CASH"],
      PAYMENT_STATUS: ["IN_PROGRESS", "COMPLETE", "FAILED"],
    },
  },
} as const