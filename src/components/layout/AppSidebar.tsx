import { NavLink, useLocation } from "react-router-dom";
import {
  Kanban,
  Users,
  FolderOpen,
  Package,
  FileText,
  BarChart3,
  Settings,
  Archive,
  Building2
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  {
    title: "Gestión",
    items: [
      { 
        title: "Dashboard", 
        url: "/", 
        icon: Kanban,
        description: "Tablero principal de órdenes"
      },
      { 
        title: "Órdenes", 
        url: "/orders", 
        icon: FileText,
        description: "Gestión completa de órdenes"
      },
    ],
  },
  {
    title: "Entidades",
    items: [
      { 
        title: "Clientes", 
        url: "/clients", 
        icon: Building2,
        description: "Gestión de clientes"
      },
      { 
        title: "Proyectos", 
        url: "/projects", 
        icon: FolderOpen,
        description: "Administración de proyectos"
      },
      { 
        title: "Productos", 
        url: "/products", 
        icon: Package,
        description: "Catálogo de productos y servicios"
      },
      { 
        title: "Usuarios", 
        url: "/users", 
        icon: Users,
        description: "Gestión de usuarios y roles"
      },
    ],
  },
  {
    title: "Análisis",
    items: [
      { 
        title: "Reportes", 
        url: "/reports", 
        icon: BarChart3,
        description: "Reportes y análisis"
      },
      { 
        title: "Auditoría", 
        url: "/audit", 
        icon: Archive,
        description: "Historial de cambios"
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      { 
        title: "Configuración", 
        url: "/settings", 
        icon: Settings,
        description: "Configuración del sistema"
      },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const getNavCls = (path: string) => {
    return isActive(path) 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50";
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Kanban className="w-4 h-4 text-primary-foreground" />
            </div>
            {state !== "collapsed" && (
              <div>
                <h1 className="font-bold text-sidebar-foreground">ERP System</h1>
                <p className="text-xs text-sidebar-foreground/60">Gestión Integral</p>
              </div>
            )}
          </div>
        </div>

        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            {state !== "collapsed" && (
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavCls(item.url)}
                        title={state === "collapsed" ? `${item.title} - ${item.description}` : undefined}
                      >
                        <item.icon className="w-4 h-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}