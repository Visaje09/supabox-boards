export const APP_CONFIG = {
  name: 'SupaBox Production',
  description: 'Sistema de gestión de producción empresarial',
  version: '1.0.0',
  author: 'SupaBox Team',
  contact: {
    email: 'soporte@supabox.com',
    phone: '+57 300 123 4567'
  }
};

export const KANBAN_STAGES = {
  COMERCIAL: 'comercial',
  INVENTARIOS: 'inventarios_suscripciones', 
  PRODUCCION: 'produccion',
  LOGISTICA: 'logistica',
  FACTURACION: 'facturacion',
  FINANCIERA: 'financiera'
} as const;

export const ORDER_STATUS = {
  ACTIVE: 'activo',
  COMPLETED: 'completado',
  CANCELLED: 'cancelado',
  ON_HOLD: 'en_espera'
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  COMERCIAL: 'comercial',
  INVENTARIO: 'inventario',
  PRODUCCION: 'produccion',
  LOGISTICA: 'logistica',
  FACTURACION: 'facturacion',
  FINANCIERA: 'financiera'
} as const;