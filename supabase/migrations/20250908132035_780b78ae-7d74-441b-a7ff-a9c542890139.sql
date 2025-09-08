-- Enable Row Level Security on all tables
ALTER TABLE public.cliente ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proyecto ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rol ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.claseorden ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ordenpedido ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responsableorden ENABLE ROW LEVEL SECURITY;

-- Create public read policies for all tables (since this appears to be an internal business app)
-- In production, you should implement proper user authentication and restrict these policies

-- Clients - allow read access
CREATE POLICY "Allow public read access to clients" ON public.cliente
FOR SELECT
USING (true);

-- Projects - allow read access  
CREATE POLICY "Allow public read access to projects" ON public.proyecto
FOR SELECT
USING (true);

-- Users - allow read access
CREATE POLICY "Allow public read access to users" ON public.usuario
FOR SELECT
USING (true);

-- Roles - allow read access
CREATE POLICY "Allow public read access to roles" ON public.rol
FOR SELECT
USING (true);

-- Order types - allow read access
CREATE POLICY "Allow public read access to order types" ON public.claseorden
FOR SELECT
USING (true);

-- Orders - allow full access for now (should be restricted in production)
CREATE POLICY "Allow full access to orders" ON public.ordenpedido
FOR ALL
USING (true)
WITH CHECK (true);

-- Responsible orders - allow full access for now
CREATE POLICY "Allow full access to responsible orders" ON public.responsableorden
FOR ALL
USING (true)
WITH CHECK (true);