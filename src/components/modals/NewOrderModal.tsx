import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Cliente, Proyecto, ComercialUser } from "@/types/database";
import { Plus, Building2, FolderOpen, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder: (orderData: any) => void;
}

export function NewOrderModal({ isOpen, onClose, onCreateOrder }: NewOrderModalProps) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [comerciales, setComerciales] = useState<ComercialUser[]>([]);
  const [tiposOrden, setTiposOrden] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    id_cliente: "",
    id_proyecto: "",
    id_clase_orden: "",
    comercial_encargado: "",
    observaciones_orden: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  const loadInitialData = async () => {
    try {
      // Load clients
      const { data: clientesData } = await supabase
        .from('cliente')
        .select('*')
        .order('nombre_cliente');
      
      // Load commercial users (users with commercial role)
      const { data: usuariosData } = await supabase
        .from('usuario')
        .select(`
          id_usuario,
          nombre_usuario,
          rol!usuario_id_rol_fkey(tipo_rol)
        `)
        .eq('rol.tipo_rol', 'comercial');

      // Load order types
      const { data: tiposData } = await supabase
        .from('claseorden')
        .select('*')
        .order('tipo_orden');

      if (clientesData) setClientes(clientesData);
      if (usuariosData) {
        setComerciales(usuariosData.map(u => ({
          id_usuario: u.id_usuario,
          nombre_usuario: u.nombre_usuario
        })));
      }
      if (tiposData) setTiposOrden(tiposData.map(t => t.tipo_orden));

    } catch (error) {
      console.error('Error loading initial data:', error);
      toast.error('Error cargando datos iniciales');
    }
  };

  const loadProyectos = async (clienteId: string) => {
    if (!clienteId) {
      setProyectos([]);
      return;
    }

    try {
      const { data: proyectosData } = await supabase
        .from('proyecto')
        .select('*')
        .eq('id_cliente', parseInt(clienteId))
        .order('nombre_proyecto');

      if (proyectosData) {
        setProyectos(proyectosData);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Error cargando proyectos');
    }
  };

  const handleClienteChange = (clienteId: string) => {
    setFormData(prev => ({ 
      ...prev, 
      id_cliente: clienteId, 
      id_proyecto: "" // Reset project when client changes
    }));
    loadProyectos(clienteId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id_cliente || !formData.comercial_encargado) {
      toast.error('Por favor complete los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        id_cliente: parseInt(formData.id_cliente),
        id_proyecto: formData.id_proyecto ? parseInt(formData.id_proyecto) : null,
        id_clase_orden: formData.id_clase_orden ? 
          tiposOrden.findIndex(t => t === formData.id_clase_orden) + 1 : null,
        observaciones_orden: formData.observaciones_orden || null,
        estado: 'comercial',
        fecha_creacion: new Date().toISOString(),
        fecha_modificacion: new Date().toISOString(),
      };

      const { data: newOrder, error } = await supabase
        .from('ordenpedido')
        .insert([orderData])
        .select(`
          *,
          cliente!inner(nombre_cliente),
          proyecto(nombre_proyecto),
          claseorden(tipo_orden)
        `)
        .single();

      if (error) throw error;

      // Create commercial assignment
      await supabase
        .from('responsableorden')
        .insert([{
          id_orden_pedido: newOrder.id_orden_pedido,
          id_usuario: parseInt(formData.comercial_encargado),
          id_rol: 1 // Assuming role ID 1 is commercial
        }]);

      onCreateOrder(newOrder);
      onClose();
      toast.success('Orden creada exitosamente');
      
      // Reset form
      setFormData({
        id_cliente: "",
        id_proyecto: "",
        id_clase_orden: "",
        comercial_encargado: "",
        observaciones_orden: "",
      });

    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error creando la orden');
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nueva Orden de Pedido
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cliente" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Cliente *
              </Label>
              <Select value={formData.id_cliente} onValueChange={handleClienteChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id_cliente} value={cliente.id_cliente.toString()}>
                      {cliente.nombre_cliente} - {cliente.nit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proyecto" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Proyecto
              </Label>
              <Select 
                value={formData.id_proyecto} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, id_proyecto: value }))}
                disabled={!formData.id_cliente}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar proyecto" />
                </SelectTrigger>
                <SelectContent>
                  {proyectos.map((proyecto) => (
                    <SelectItem key={proyecto.id_proyecto} value={proyecto.id_proyecto.toString()}>
                      {proyecto.nombre_proyecto}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="comercial">Comercial Encargado *</Label>
              <Select 
                value={formData.comercial_encargado} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, comercial_encargado: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar comercial" />
                </SelectTrigger>
                <SelectContent>
                  {comerciales.map((comercial) => (
                    <SelectItem key={comercial.id_usuario} value={comercial.id_usuario.toString()}>
                      {comercial.nombre_usuario}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo_orden">Tipo de Orden</Label>
              <Select 
                value={formData.id_clase_orden} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, id_clase_orden: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposOrden.map((tipo, index) => (
                    <SelectItem key={index} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea
              id="observaciones"
              value={formData.observaciones_orden}
              onChange={(e) => setFormData(prev => ({ ...prev, observaciones_orden: e.target.value }))}
              placeholder="Observaciones adicionales..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              variant="gradient"
            >
              {loading ? 'Creando...' : 'Crear Orden'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}