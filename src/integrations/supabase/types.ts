export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      atendimentos: {
        Row: {
          created_at: string
          data: string
          deleted_at: string | null
          descricao: string | null
          id: string
          id_empresa: string
          id_usuario: string
          origem: string
          status: string
        }
        Insert: {
          created_at?: string
          data?: string
          deleted_at?: string | null
          descricao?: string | null
          id?: string
          id_empresa: string
          id_usuario: string
          origem?: string
          status?: string
        }
        Update: {
          created_at?: string
          data?: string
          deleted_at?: string | null
          descricao?: string | null
          id?: string
          id_empresa?: string
          id_usuario?: string
          origem?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "atendimentos_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atendimentos_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          cnpj: string
          codigo_empresa: string
          created_at: string
          deleted_at: string | null
          id: string
          nome: string
        }
        Insert: {
          cnpj: string
          codigo_empresa: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          nome: string
        }
        Update: {
          cnpj?: string
          codigo_empresa?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          nome?: string
        }
        Relationships: []
      }
      invitation_links: {
        Row: {
          active: boolean | null
          created_at: string | null
          created_by: string
          current_uses: number | null
          expires_at: string | null
          id: string
          id_empresa: string
          max_uses: number | null
          token: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          created_by: string
          current_uses?: number | null
          expires_at?: string | null
          id?: string
          id_empresa: string
          max_uses?: number | null
          token: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          created_by?: string
          current_uses?: number | null
          expires_at?: string | null
          id?: string
          id_empresa?: string
          max_uses?: number | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "invitation_links_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      user_imports: {
        Row: {
          created_at: string | null
          error_log: Json | null
          failed_rows: number | null
          filename: string
          id: string
          id_empresa: string
          status: string | null
          successful_rows: number | null
          total_rows: number
          uploaded_by: string
        }
        Insert: {
          created_at?: string | null
          error_log?: Json | null
          failed_rows?: number | null
          filename: string
          id?: string
          id_empresa: string
          status?: string | null
          successful_rows?: number | null
          total_rows: number
          uploaded_by: string
        }
        Update: {
          created_at?: string | null
          error_log?: Json | null
          failed_rows?: number | null
          filename?: string
          id?: string
          id_empresa?: string
          status?: string | null
          successful_rows?: number | null
          total_rows?: number
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_imports_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          id_empresa: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          id_empresa?: string | null
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          id_empresa?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          ativo: boolean | null
          cpf_criptografado: string
          created_at: string
          deleted_at: string | null
          email: string
          grau_parentesco: string | null
          id: string
          id_auth: string | null
          id_empresa: string
          id_usuario_principal: string | null
          nome: string
          numero_cliente: string
          telefone: string | null
          tipo_usuario: string
        }
        Insert: {
          ativo?: boolean | null
          cpf_criptografado: string
          created_at?: string
          deleted_at?: string | null
          email: string
          grau_parentesco?: string | null
          id?: string
          id_auth?: string | null
          id_empresa: string
          id_usuario_principal?: string | null
          nome: string
          numero_cliente: string
          telefone?: string | null
          tipo_usuario: string
        }
        Update: {
          ativo?: boolean | null
          cpf_criptografado?: string
          created_at?: string
          deleted_at?: string | null
          email?: string
          grau_parentesco?: string | null
          id?: string
          id_auth?: string | null
          id_empresa?: string
          id_usuario_principal?: string | null
          nome?: string
          numero_cliente?: string
          telefone?: string | null
          tipo_usuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuarios_id_empresa_fkey"
            columns: ["id_empresa"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usuarios_id_usuario_principal_fkey"
            columns: ["id_usuario_principal"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      encrypt_cpf: { Args: { cpf_plain: string }; Returns: string }
      find_user_by_cpf: {
        Args: { cpf_plain: string }
        Returns: {
          ativo: boolean | null
          cpf_criptografado: string
          created_at: string
          deleted_at: string | null
          email: string
          grau_parentesco: string | null
          id: string
          id_auth: string | null
          id_empresa: string
          id_usuario_principal: string | null
          nome: string
          numero_cliente: string
          telefone: string | null
          tipo_usuario: string
        }[]
        SetofOptions: {
          from: "*"
          to: "usuarios"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      generate_numero_cliente: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_role_in_empresa: {
        Args: {
          _id_empresa: string
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "admin_empresa" | "usuario"
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
  public: {
    Enums: {
      app_role: ["super_admin", "admin_empresa", "usuario"],
    },
  },
} as const
