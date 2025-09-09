import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Package, Filter } from "lucide-react";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Productos y Servicios</h1>
          <p className="text-muted-foreground">
            Catálogo completo de productos y servicios
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar productos o servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
        <Badge variant="secondary">0 productos</Badge>
      </div>

      {/* Empty State */}
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
          Catálogo de Productos
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Administra tu catálogo de productos y servicios. Define características, 
          precios y disponibilidad para optimizar las órdenes de pedido.
        </p>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Crear Primer Producto
        </Button>
      </div>
    </div>
  );
}