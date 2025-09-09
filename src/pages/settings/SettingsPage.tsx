import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Truck, 
  CreditCard, 
  Tags, 
  Users, 
  Database,
  Shield,
  Bell
} from "lucide-react";

const settingsCategories = [
  {
    title: "Transportadoras",
    description: "Configuración de empresas de transporte y logística",
    icon: Truck,
    color: "text-primary",
    items: ["Crear transportadoras", "Tarifas de envío", "Zonas de cobertura"]
  },
  {
    title: "Métodos de Pago",
    description: "Configuración de formas de pago y términos comerciales",
    icon: CreditCard,
    color: "text-success",
    items: ["Contado", "Crédito", "Plazos de pago", "Condiciones especiales"]
  },
  {
    title: "Tipos de Orden",
    description: "Clasificación y categorización de órdenes de pedido",
    icon: Tags,
    color: "text-info",
    items: ["Orden estándar", "Orden urgente", "Orden especial", "Orden de prueba"]
  },
  {
    title: "Roles y Permisos",
    description: "Configuración de roles de usuario y permisos del sistema",
    icon: Shield,
    color: "text-warning",
    items: ["Comercial", "Producción", "Logística", "Administrador"]
  },
  {
    title: "Operadores y Planes",
    description: "Gestión de operadores de servicios y planes disponibles",
    icon: Users,
    color: "text-accent",
    items: ["Operadores móviles", "Planes de datos", "Configuración APN"]
  },
  {
    title: "Configuración General",
    description: "Parámetros generales del sistema y preferencias",
    icon: Database,
    color: "text-secondary",
    items: ["Empresa", "Numeración", "Formatos", "Integraciónes"]
  },
];

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
          <p className="text-muted-foreground">
            Administración de catálogos, parámetros y configuraciones del sistema
          </p>
        </div>
        <Button variant="outline">
          <Bell className="w-4 h-4 mr-2" />
          Notificaciones
        </Button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCategories.map((category) => (
          <Card key={category.title} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <category.icon className={`w-6 h-6 ${category.color} mt-1`} />
                <div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{item}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.floor(Math.random() * 10) + 1}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Configurar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Estado del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-3 h-3 bg-success rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Base de Datos</p>
              <p className="text-xs text-muted-foreground">Conectada</p>
            </div>
            <div className="text-center p-4">
              <div className="w-3 h-3 bg-success rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Servicios</p>
              <p className="text-xs text-muted-foreground">Operativos</p>
            </div>
            <div className="text-center p-4">
              <div className="w-3 h-3 bg-warning rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium">Respaldo</p>
              <p className="text-xs text-muted-foreground">Pendiente</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}