import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Package, FileText, Calendar } from "lucide-react";

const reportCards = [
  {
    title: "Órdenes por Estado",
    description: "Distribución de órdenes en el flujo de trabajo",
    icon: BarChart3,
    color: "text-primary",
    category: "Operacional"
  },
  {
    title: "Rendimiento Comercial",
    description: "Análisis de ventas y proyecciones",
    icon: TrendingUp,
    color: "text-success",
    category: "Comercial"
  },
  {
    title: "Productividad por Usuario",
    description: "Métricas de desempeño del equipo",
    icon: Users,
    color: "text-info",
    category: "Recursos Humanos"
  },
  {
    title: "Rotación de Inventario",
    description: "Análisis de productos y servicios",
    icon: Package,
    color: "text-warning",
    category: "Inventario"
  },
  {
    title: "Facturas Pendientes",
    description: "Estado de facturación y cartera",
    icon: FileText,
    color: "text-destructive",
    category: "Financiero"
  },
  {
    title: "Cronograma de Producción",
    description: "Planificación y tiempos de entrega",
    icon: Calendar,
    color: "text-accent",
    category: "Producción"
  },
];

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reportes y Análisis</h1>
          <p className="text-muted-foreground">
            Dashboard ejecutivo e informes personalizables
          </p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generar Reporte
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Órdenes Activas</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ventas del Mes</p>
                <p className="text-2xl font-bold text-foreground">$1.2M</p>
              </div>
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Usuarios Activos</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <Users className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Productos</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <Package className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Reportes Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportCards.map((report) => (
            <Card key={report.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <report.icon className={`w-6 h-6 ${report.color}`} />
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {report.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {report.description}
                </p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Ver Reporte
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}