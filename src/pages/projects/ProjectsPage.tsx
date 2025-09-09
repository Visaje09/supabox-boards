import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FolderOpen, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Proyecto, Cliente } from "@/types/database";

interface ProyectoWithCliente extends Proyecto {
  cliente?: Cliente;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProyectoWithCliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('proyecto')
        .select(`
          *,
          cliente(*)
        `)
        .order('nombre_proyecto');

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Error cargando proyectos');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.nombre_proyecto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.cliente?.nombre_cliente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.descripcion_proyecto?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Proyectos</h1>
          <p className="text-muted-foreground">
            Gestión de proyectos y vinculación con clientes
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="secondary">
          {filteredProjects.length} proyectos
        </Badge>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id_proyecto} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-2">
                  <FolderOpen className="w-5 h-5 text-accent mt-1" />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.nombre_proyecto}</CardTitle>
                    {project.cliente && (
                      <div className="flex items-center gap-1 mt-1">
                        <Building2 className="w-3 h-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {project.cliente.nombre_cliente}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.descripcion_proyecto && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.descripcion_proyecto}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Activo</Badge>
                  <Button variant="ghost" size="sm">
                    Ver detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {!loading && filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">
            No se encontraron proyectos
          </h3>
          <p className="text-sm text-muted-foreground">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Comienza creando tu primer proyecto'}
          </p>
        </div>
      )}
    </div>
  );
}