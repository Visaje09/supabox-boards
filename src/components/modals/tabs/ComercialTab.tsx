import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { OrdenKanban, Cliente, Proyecto, ComercialUser } from "@/types/database";
import { Building2, FolderOpen, User, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ComercialTabProps {
  order: OrdenKanban;
  onUpdateOrder: (orderId: number, updates: Partial<OrdenKanban>) => void;
}

export function ComercialTab({ order, onUpdateOrder }: ComercialTabProps) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [comerciales, setComerciales] = useState<ComercialUser[]>([]);
  const [loading, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    id_cliente: "",
    id_proyecto: "",
    comercial_encargado: order.comercial_encargado || "",
    observaciones_orden: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load clients
      const { data: clientesData } = await supabase
        .from('cliente')
        .select('*')
        .order('nombre_cliente');
      
      // Load commercial users
      const { data: usuariosData } = await supabase
        .from('usuario')
        .select(`
          id_usuario,
          nombre_usuario,
          rol!inner(tipo_rol)
        `)
        .eq('rol.tipo_rol', 'comercial');

      if (clientesData) setClientes(clientesData);
      if (usuariosData) {
        setComerciales(usuariosData.map(u => ({
          id_usuario: u.id_usuario,
          nombre_usuario: u.nombre_usuario
        })));
      }

      // Load order details
      const { data: orderData } = await supabase
        .from('ordenpedido')
        .select(`
          *,
          cliente(nombre_cliente),
          proyecto(nombre_proyecto, id_proyecto)
        `)
        .eq('id_orden_pedido', order.id_orden_pedido)
        .single();

      if (orderData) {
        setFormData({
          id_cliente: orderData.id_cliente.toString(),
          id_proyecto: orderData.id_proyecto?.toString() || "",
          comercial_encargado: order.comercial_encargado || "",
          observaciones_orden: orderData.observaciones_orden || "",
        });
        
        if (orderData.id_cliente) {
          loadProyectos(orderData.id_cliente.toString());
        }
      }

    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const loadProyectos = async (clienteId: string) => {
    if (!clienteId) return;
    
    try {
      const { data: proyectosData } = await supabase
        .from('proyecto')
        .select('*')
        .eq('id_cliente', parseInt(clienteId))
        .order('nombre_proyecto');

      if (proyectosData) setProyectos(proyectosData);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleClienteChange = (clienteId: string) => {
    setFormData(prev => ({ ...prev, id_cliente: clienteId, id_proyecto: "" }));
    loadProyectos(clienteId);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('ordenpedido')
        .update({
          id_cliente: parseInt(formData.id_cliente),
          id_proyecto: formData.id_proyecto ? parseInt(formData.id_proyecto) : null,
          observaciones_orden: formData.observaciones_orden,
          fecha_modificacion: new Date().toISOString(),
        })
        .eq('id_orden_pedido', order.id_orden_pedido);

      if (error) throw error;

      onUpdateOrder(order.id_orden_pedido, {
        comercial_encargado: formData.comercial_encargado,
        fecha_modificacion: new Date().toISOString(),
      });

      toast.success('Datos comerciales guardados');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Error guardando los datos');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="w-5 h-5" />
            Información Comercial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Cliente
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
              <Label className="flex items-center gap-2">
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

          <div className="space-y-2">
            <Label>Comercial Encargado</Label>
            <Select 
              value={formData.comercial_encargado} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, comercial_encargado: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar comercial" />
              </SelectTrigger>
              <SelectContent>
                {comerciales.map((comercial) => (
                  <SelectItem key={comercial.id_usuario} value={comercial.nombre_usuario}>
                    {comercial.nombre_usuario}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Observaciones</Label>
            <Textarea
              value={formData.observaciones_orden}
              onChange={(e) => setFormData(prev => ({ ...prev, observaciones_orden: e.target.value }))}
              placeholder="Observaciones comerciales..."
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSave} 
            disabled={loading}
            variant="gradient"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}