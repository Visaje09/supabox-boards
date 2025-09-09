import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, Shield } from "lucide-react";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Usuarios y Roles</h1>
          <p className="text-muted-foreground">
            Gestión de usuarios, permisos y control de acceso
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="secondary">0 usuarios</Badge>
      </div>

      {/* Empty State */}
      <div className="text-center py-16">
        <div className="relative mb-6">
          <Users className="w-16 h-16 text-muted-foreground mx-auto" />
          <Shield className="w-6 h-6 text-primary absolute -bottom-1 -right-1 bg-background rounded-full" />
        </div>
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
          Gestión de Usuarios
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Administra usuarios del sistema, asigna roles y permisos para 
          controlar el acceso a diferentes módulos y funcionalidades.
        </p>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Crear Usuario
        </Button>
      </div>
    </div>
  );
}