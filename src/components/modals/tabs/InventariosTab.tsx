import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OrdenKanban } from "@/types/database";
import { Package, CheckCircle, AlertCircle } from "lucide-react";

interface InventariosTabProps {
  order: OrdenKanban;
  onUpdateOrder: (orderId: number, updates: Partial<OrdenKanban>) => void;
}

export function InventariosTab({ order }: InventariosTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="w-5 h-5" />
            Inventarios y Suscripciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-4 bg-info/10 rounded-lg">
            <AlertCircle className="w-5 h-5 text-info" />
            <p className="text-sm">
              El picking físico se realiza de forma manual fuera de la aplicación. 
              Esta sección refleja únicamente el resultado final.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Estado del Inventario</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm">Asignación de Seriales/IMEIs</span>
                  <Badge variant="outline" className="text-warning bg-warning/10">
                    Pendiente
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm">Reclasificación de Productos</span>
                  <Badge variant="outline" className="text-muted-foreground">
                    No Requerido
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm">Proceso de Compra</span>
                  <Badge variant="outline" className="text-muted-foreground">
                    No Requerido
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Acciones de Inventario</h4>
              <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  Las acciones se registran desde el sistema externo de inventarios
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}