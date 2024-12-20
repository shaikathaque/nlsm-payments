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
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_secret: {
        Args: {
          secret_name: string
        }
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

