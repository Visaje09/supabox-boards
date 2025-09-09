import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KanbanColumn } from "./kanban/KanbanColumn";
import { OrderModal } from "./modals/OrderModal";
import { NewOrderModal } from "./modals/NewOrderModal";
import { OrdenKanban, KanbanColumn as KanbanColumnType, OrdenEstado } from "@/types/database";
import { Plus, Search, Filter, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const KANBAN_COLUMNS: KanbanColumnType[] = [
  {
    id: "comercial",
    title: "Comercial",
    description: "Órdenes en gestión comercial",
    color: "bg-accent text-accent-foreground",
    orders: [],
  },
  {
    id: "inventarios_suscripciones",
    title: "Inventarios/Suscripciones",
    description: "Asignación y picking",
    color: "bg-info text-info-foreground",
    orders: [],
  },
  {
    id: "produccion",
    title: "Producción",
    description: "Órdenes de producción activas",
    color: "bg-warning text-warning-foreground",
    orders: [],
  },
  {
    id: "logistica",
    title: "Logística",
    description: "Despacho y entrega",
    color: "bg-secondary text-secondary-foreground",
    orders: [],
  },
  {
    id: "facturacion",
    title: "Facturación",
    description: "Generación de facturas",
    color: "bg-primary text-primary-foreground",
    orders: [],
  },
  {
    id: "financiera",
    title: "Financiera",
    description: "Gestión de pagos",
    color: "bg-success text-success-foreground",
    orders: [],
  },
];

export function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumnType[]>(KANBAN_COLUMNS);
  const [selectedOrder, setSelectedOrder] = useState<OrdenKanban | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const { data: ordersData, error } = await supabase
        .from('ordenpedido')
        .select(`
          id_orden_pedido,
          consecutivo,
          estado,
          fecha_modificacion,
          cliente!inner(nombre_cliente),
          proyecto(nombre_proyecto),
          claseorden(tipo_orden),
          responsableorden!inner(
            usuario!inner(nombre_usuario)
          )
        `)
        .order('fecha_modificacion', { ascending: false });

      if (error) throw error;

      // Transform and distribute orders into columns
      const transformedOrders: OrdenKanban[] = ordersData?.map((order: any) => ({
        id_orden_pedido: order.id_orden_pedido,
        consecutivo: order.consecutivo,
        cliente_nombre: order.cliente?.nombre_cliente || 'Cliente no especificado',
        tipo_orden: order.claseorden?.tipo_orden || 'Tipo no especificado',
        estado: (order.estado as OrdenEstado) || 'comercial',
        fecha_modificacion: order.fecha_modificacion,
        proyecto_nombre: order.proyecto?.nombre_proyecto,
        comercial_encargado: order.responsableorden?.[0]?.usuario?.nombre_usuario,
      })) || [];

      // Distribute orders into columns
      const updatedColumns = KANBAN_COLUMNS.map(column => ({
        ...column,
        orders: transformedOrders.filter(order => order.estado === column.id),
      }));

      setColumns(updatedColumns);

    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Error cargando las órdenes');
    }
    setLoading(false);
  };

  const handleOrderClick = (order: OrdenKanban) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleUpdateOrder = async (orderId: number, updates: Partial<OrdenKanban>) => {
    // Update local state first for immediate UI feedback
    setColumns(prevColumns => 
      prevColumns.map(column => ({
        ...column,
        orders: column.orders.map(order => 
          order.id_orden_pedido === orderId ? { ...order, ...updates } : order
        ).filter(order => order.estado === column.id)
      }))
    );

    // If estado changed, move order to new column
    if (updates.estado) {
      setColumns(prevColumns => 
        prevColumns.map(column => {
          // Remove from current column
          const filteredOrders = column.orders.filter(order => order.id_orden_pedido !== orderId);
          
          // Add to new column if it matches
          if (column.id === updates.estado) {
            const updatedOrder = columns
              .flatMap(col => col.orders)
              .find(order => order.id_orden_pedido === orderId);
            
            if (updatedOrder) {
              return {
                ...column,
                orders: [...filteredOrders, { ...updatedOrder, ...updates }]
              };
            }
          }
          
          return { ...column, orders: filteredOrders };
        })
      );
    }

    // Update selected order if it's the same
    if (selectedOrder?.id_orden_pedido === orderId) {
      setSelectedOrder(prev => prev ? { ...prev, ...updates } : null);
    }

    // Refresh orders from database to ensure persistence
    await loadOrders();
  };

  const handleCreateOrder = (newOrder: any) => {
    const transformedOrder: OrdenKanban = {
      id_orden_pedido: newOrder.id_orden_pedido,
      consecutivo: newOrder.consecutivo,
      cliente_nombre: newOrder.cliente?.nombre_cliente || 'Cliente no especificado',
      tipo_orden: newOrder.claseorden?.tipo_orden || 'Tipo no especificado', 
      estado: 'comercial',
      fecha_modificacion: newOrder.fecha_modificacion,
      proyecto_nombre: newOrder.proyecto?.nombre_proyecto,
    };

    // Add to comercial column
    setColumns(prevColumns =>
      prevColumns.map(column =>
        column.id === 'comercial'
          ? { ...column, orders: [transformedOrder, ...column.orders] }
          : column
      )
    );
  };

  const filteredColumns = columns.map(column => ({
    ...column,
    orders: column.orders.filter(order => 
      searchTerm === "" || 
      order.cliente_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.consecutivo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.tipo_orden.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  const totalOrders = columns.reduce((sum, column) => sum + column.orders.length, 0);

  return (
    <div className="h-screen bg-kanban-bg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestión de Producción</h1>
            <p className="text-muted-foreground">
              Tablero Kanban para seguimiento de órdenes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-sm">
              {totalOrders} órdenes activas
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={loadOrders}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            <Button 
              onClick={() => setIsNewOrderModalOpen(true)}
              variant="gradient"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Orden
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar por cliente, orden o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
        <div className="flex gap-4 h-full min-w-max">
          {filteredColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onOrderClick={handleOrderClick}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <OrderModal
        order={selectedOrder}
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setSelectedOrder(null);
        }}
        onUpdateOrder={handleUpdateOrder}
      />

      <NewOrderModal
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
        onCreateOrder={handleCreateOrder}
      />
    </div>
  );
}