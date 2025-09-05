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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      apn: {
        Row: {
          apn: string
          id_apn: number
          id_operador: number
        }
        Insert: {
          apn: string
          id_apn?: number
          id_operador: number
        }
        Update: {
          apn?: string
          id_apn?: number
          id_operador?: number
        }
        Relationships: [
          {
            foreignKeyName: "apn_id_operador_fkey"
            columns: ["id_operador"]
            isOneToOne: false
            referencedRelation: "operador"
            referencedColumns: ["id_operador"]
          },
        ]
      }
      claseorden: {
        Row: {
          id_clase_orden: number
          tipo_orden: string
        }
        Insert: {
          id_clase_orden?: number
          tipo_orden: string
        }
        Update: {
          id_clase_orden?: number
          tipo_orden?: string
        }
        Relationships: []
      }
      cliente: {
        Row: {
          id_cliente: number
          nit: string
          nombre_cliente: string
        }
        Insert: {
          id_cliente?: number
          nit: string
          nombre_cliente: string
        }
        Update: {
          id_cliente?: number
          nit?: string
          nombre_cliente?: string
        }
        Relationships: []
      }
      detalleorden: {
        Row: {
          cantidad: number | null
          id_orden_detalle: number
          id_orden_pedido: number
          id_producto: number
          observaciones_detalle: string | null
          plantilla: string | null
          valor_unitario: number | null
        }
        Insert: {
          cantidad?: number | null
          id_orden_detalle?: number
          id_orden_pedido: number
          id_producto: number
          observaciones_detalle?: string | null
          plantilla?: string | null
          valor_unitario?: number | null
        }
        Update: {
          cantidad?: number | null
          id_orden_detalle?: number
          id_orden_pedido?: number
          id_producto?: number
          observaciones_detalle?: string | null
          plantilla?: string | null
          valor_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "detalleorden_id_orden_pedido_fkey"
            columns: ["id_orden_pedido"]
            isOneToOne: false
            referencedRelation: "ordenpedido"
            referencedColumns: ["id_orden_pedido"]
          },
          {
            foreignKeyName: "detalleorden_id_producto_fkey"
            columns: ["id_producto"]
            isOneToOne: false
            referencedRelation: "producto"
            referencedColumns: ["id_producto"]
          },
        ]
      }
      factura: {
        Row: {
          estado_factura: string | null
          fecha_factura: string | null
          id_factura: number
          id_orden_pedido: number
          id_tipo_pago: number | null
          numero_factura: string | null
        }
        Insert: {
          estado_factura?: string | null
          fecha_factura?: string | null
          id_factura?: number
          id_orden_pedido: number
          id_tipo_pago?: number | null
          numero_factura?: string | null
        }
        Update: {
          estado_factura?: string | null
          fecha_factura?: string | null
          id_factura?: number
          id_orden_pedido?: number
          id_tipo_pago?: number | null
          numero_factura?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "factura_id_orden_pedido_fkey"
            columns: ["id_orden_pedido"]
            isOneToOne: false
            referencedRelation: "ordenpedido"
            referencedColumns: ["id_orden_pedido"]
          },
          {
            foreignKeyName: "factura_id_tipo_pago_fkey"
            columns: ["id_tipo_pago"]
            isOneToOne: false
            referencedRelation: "tipopago"
            referencedColumns: ["id_tipo_pago"]
          },
        ]
      }
      lineadetalle: {
        Row: {
          cantidad: number | null
          id_apn: number
          id_linea_detalle: number
          id_operador: number
          id_orden_pedido: number
          id_plan: number
          ip: string | null
          valor: number | null
        }
        Insert: {
          cantidad?: number | null
          id_apn: number
          id_linea_detalle?: number
          id_operador: number
          id_orden_pedido: number
          id_plan: number
          ip?: string | null
          valor?: number | null
        }
        Update: {
          cantidad?: number | null
          id_apn?: number
          id_linea_detalle?: number
          id_operador?: number
          id_orden_pedido?: number
          id_plan?: number
          ip?: string | null
          valor?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lineadetalle_id_apn_fkey"
            columns: ["id_apn"]
            isOneToOne: false
            referencedRelation: "apn"
            referencedColumns: ["id_apn"]
          },
          {
            foreignKeyName: "lineadetalle_id_operador_fkey"
            columns: ["id_operador"]
            isOneToOne: false
            referencedRelation: "operador"
            referencedColumns: ["id_operador"]
          },
          {
            foreignKeyName: "lineadetalle_id_orden_pedido_fkey"
            columns: ["id_orden_pedido"]
            isOneToOne: false
            referencedRelation: "ordenpedido"
            referencedColumns: ["id_orden_pedido"]
          },
          {
            foreignKeyName: "lineadetalle_id_plan_fkey"
            columns: ["id_plan"]
            isOneToOne: false
            referencedRelation: "plan"
            referencedColumns: ["id_plan"]
          },
        ]
      }
      metododespacho: {
        Row: {
          contacto_despacho: string | null
          contacto_email_guia: string | null
          contacto_telefono: string | null
          direccion_despacho: string | null
          id_metodo_despacho: number
          id_transportadora: number | null
          tipo_despacho: string | null
        }
        Insert: {
          contacto_despacho?: string | null
          contacto_email_guia?: string | null
          contacto_telefono?: string | null
          direccion_despacho?: string | null
          id_metodo_despacho?: number
          id_transportadora?: number | null
          tipo_despacho?: string | null
        }
        Update: {
          contacto_despacho?: string | null
          contacto_email_guia?: string | null
          contacto_telefono?: string | null
          direccion_despacho?: string | null
          id_metodo_despacho?: number
          id_transportadora?: number | null
          tipo_despacho?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "metododespacho_id_transportadora_fkey"
            columns: ["id_transportadora"]
            isOneToOne: false
            referencedRelation: "transportadora"
            referencedColumns: ["id_transportadora"]
          },
        ]
      }
      operador: {
        Row: {
          id_operador: number
          nombre_operador: string
        }
        Insert: {
          id_operador?: number
          nombre_operador: string
        }
        Update: {
          id_operador?: number
          nombre_operador?: string
        }
        Relationships: []
      }
      ordenpedido: {
        Row: {
          consecutivo: string | null
          estado: string | null
          fecha_creacion: string | null
          fecha_modificacion: string | null
          id_clase_orden: number | null
          id_cliente: number
          id_metodo_despacho: number | null
          id_orden_pedido: number
          id_proyecto: number | null
          id_tipo_pago: number | null
          observaciones_orden: string | null
        }
        Insert: {
          consecutivo?: string | null
          estado?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id_clase_orden?: number | null
          id_cliente: number
          id_metodo_despacho?: number | null
          id_orden_pedido?: number
          id_proyecto?: number | null
          id_tipo_pago?: number | null
          observaciones_orden?: string | null
        }
        Update: {
          consecutivo?: string | null
          estado?: string | null
          fecha_creacion?: string | null
          fecha_modificacion?: string | null
          id_clase_orden?: number | null
          id_cliente?: number
          id_metodo_despacho?: number | null
          id_orden_pedido?: number
          id_proyecto?: number | null
          id_tipo_pago?: number | null
          observaciones_orden?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ordenpedido_id_clase_orden_fkey"
            columns: ["id_clase_orden"]
            isOneToOne: false
            referencedRelation: "claseorden"
            referencedColumns: ["id_clase_orden"]
          },
          {
            foreignKeyName: "ordenpedido_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "cliente"
            referencedColumns: ["id_cliente"]
          },
          {
            foreignKeyName: "ordenpedido_id_metodo_despacho_fkey"
            columns: ["id_metodo_despacho"]
            isOneToOne: false
            referencedRelation: "metododespacho"
            referencedColumns: ["id_metodo_despacho"]
          },
          {
            foreignKeyName: "ordenpedido_id_proyecto_fkey"
            columns: ["id_proyecto"]
            isOneToOne: false
            referencedRelation: "proyecto"
            referencedColumns: ["id_proyecto"]
          },
          {
            foreignKeyName: "ordenpedido_id_tipo_pago_fkey"
            columns: ["id_tipo_pago"]
            isOneToOne: false
            referencedRelation: "tipopago"
            referencedColumns: ["id_tipo_pago"]
          },
        ]
      }
      ordenproduccion: {
        Row: {
          estado_orden_produccion: string | null
          fecha_produccion: string | null
          id_orden_pedido: number
          id_orden_produccion: number
          numero_produccion: string | null
          observaciones_produccion: string | null
        }
        Insert: {
          estado_orden_produccion?: string | null
          fecha_produccion?: string | null
          id_orden_pedido: number
          id_orden_produccion?: number
          numero_produccion?: string | null
          observaciones_produccion?: string | null
        }
        Update: {
          estado_orden_produccion?: string | null
          fecha_produccion?: string | null
          id_orden_pedido?: number
          id_orden_produccion?: number
          numero_produccion?: string | null
          observaciones_produccion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ordenproduccion_id_orden_pedido_fkey"
            columns: ["id_orden_pedido"]
            isOneToOne: false
            referencedRelation: "ordenpedido"
            referencedColumns: ["id_orden_pedido"]
          },
        ]
      }
      plan: {
        Row: {
          id_operador: number
          id_plan: number
          nombre_plan: string
        }
        Insert: {
          id_operador: number
          id_plan?: number
          nombre_plan: string
        }
        Update: {
          id_operador?: number
          id_plan?: number
          nombre_plan?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_id_operador_fkey"
            columns: ["id_operador"]
            isOneToOne: false
            referencedRelation: "operador"
            referencedColumns: ["id_operador"]
          },
        ]
      }
      producto: {
        Row: {
          descripcion: string | null
          id_producto: number
          tipo_producto: string
        }
        Insert: {
          descripcion?: string | null
          id_producto?: number
          tipo_producto: string
        }
        Update: {
          descripcion?: string | null
          id_producto?: number
          tipo_producto?: string
        }
        Relationships: []
      }
      proyecto: {
        Row: {
          descripcion_proyecto: string | null
          id_cliente: number
          id_proyecto: number
          nombre_proyecto: string
        }
        Insert: {
          descripcion_proyecto?: string | null
          id_cliente: number
          id_proyecto?: number
          nombre_proyecto: string
        }
        Update: {
          descripcion_proyecto?: string | null
          id_cliente?: number
          id_proyecto?: number
          nombre_proyecto?: string
        }
        Relationships: [
          {
            foreignKeyName: "proyecto_id_cliente_fkey"
            columns: ["id_cliente"]
            isOneToOne: false
            referencedRelation: "cliente"
            referencedColumns: ["id_cliente"]
          },
        ]
      }
      remision: {
        Row: {
          estado_remision: string | null
          fecha_remision: string | null
          id_orden_pedido: number
          id_remision: number
          numero_remision: string | null
        }
        Insert: {
          estado_remision?: string | null
          fecha_remision?: string | null
          id_orden_pedido: number
          id_remision?: number
          numero_remision?: string | null
        }
        Update: {
          estado_remision?: string | null
          fecha_remision?: string | null
          id_orden_pedido?: number
          id_remision?: number
          numero_remision?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "remision_id_orden_pedido_fkey"
            columns: ["id_orden_pedido"]
            isOneToOne: false
            referencedRelation: "ordenpedido"
            referencedColumns: ["id_orden_pedido"]
          },
        ]
      }
      responsableorden: {
        Row: {
          id_orden_pedido: number
          id_rol: number
          id_usuario: number
        }
        Insert: {
          id_orden_pedido: number
          id_rol: number
          id_usuario: number
        }
        Update: {
          id_orden_pedido?: number
          id_rol?: number
          id_usuario?: number
        }
        Relationships: [
          {
            foreignKeyName: "responsableorden_id_orden_pedido_fkey"
            columns: ["id_orden_pedido"]
            isOneToOne: false
            referencedRelation: "ordenpedido"
            referencedColumns: ["id_orden_pedido"]
          },
          {
            foreignKeyName: "responsableorden_id_rol_fkey"
            columns: ["id_rol"]
            isOneToOne: false
            referencedRelation: "rol"
            referencedColumns: ["id_rol"]
          },
          {
            foreignKeyName: "responsableorden_id_usuario_fkey"
            columns: ["id_usuario"]
            isOneToOne: false
            referencedRelation: "usuario"
            referencedColumns: ["id_usuario"]
          },
        ]
      }
      rol: {
        Row: {
          id_rol: number
          tipo_rol: string
        }
        Insert: {
          id_rol?: number
          tipo_rol: string
        }
        Update: {
          id_rol?: number
          tipo_rol?: string
        }
        Relationships: []
      }
      tipopago: {
        Row: {
          aprobado_cartera: boolean | null
          forma_pago: string
          id_tipo_pago: number
          plazo: string | null
        }
        Insert: {
          aprobado_cartera?: boolean | null
          forma_pago: string
          id_tipo_pago?: number
          plazo?: string | null
        }
        Update: {
          aprobado_cartera?: boolean | null
          forma_pago?: string
          id_tipo_pago?: number
          plazo?: string | null
        }
        Relationships: []
      }
      transportadora: {
        Row: {
          fecha_transportadora: string | null
          id_transportadora: number
          nombre_transportadora: string | null
          observaciones_envio: string | null
        }
        Insert: {
          fecha_transportadora?: string | null
          id_transportadora?: number
          nombre_transportadora?: string | null
          observaciones_envio?: string | null
        }
        Update: {
          fecha_transportadora?: string | null
          id_transportadora?: number
          nombre_transportadora?: string | null
          observaciones_envio?: string | null
        }
        Relationships: []
      }
      usuario: {
        Row: {
          contrasena: string
          id_rol: number
          id_usuario: number
          nombre_usuario: string
        }
        Insert: {
          contrasena: string
          id_rol: number
          id_usuario?: number
          nombre_usuario: string
        }
        Update: {
          contrasena?: string
          id_rol?: number
          id_usuario?: number
          nombre_usuario?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_id_rol_fkey"
            columns: ["id_rol"]
            isOneToOne: false
            referencedRelation: "rol"
            referencedColumns: ["id_rol"]
          },
        ]
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
    Enums: {},
  },
} as const
