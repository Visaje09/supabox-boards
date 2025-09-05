export type OrdenEstado = 
  | 'comercial'
  | 'inventarios_suscripciones' 
  | 'produccion'
  | 'logistica'
  | 'facturacion'
  | 'financiera';

export interface OrdenKanban {
  id_orden_pedido: number;
  consecutivo: string | null;
  cliente_nombre: string;
  tipo_orden: string;
  estado: OrdenEstado;
  fecha_modificacion: string | null;
  comercial_encargado?: string;
  proyecto_nombre?: string;
}

export interface KanbanColumn {
  id: OrdenEstado;
  title: string;
  description: string;
  color: string;
  orders: OrdenKanban[];
}

export interface ComercialUser {
  id_usuario: number;
  nombre_usuario: string;
}

export interface Cliente {
  id_cliente: number;
  nombre_cliente: string;
  nit: string;
}

export interface Proyecto {
  id_proyecto: number;
  nombre_proyecto: string;
  descripcion_proyecto?: string;
  id_cliente: number;
}