-- Drop existing restrictive policies and create proper ones for anonymous access
DROP POLICY IF EXISTS "Allow public read access to clients" ON public.cliente;
DROP POLICY IF EXISTS "Allow public read access to projects" ON public.proyecto;
DROP POLICY IF EXISTS "Allow public read access to users" ON public.usuario;
DROP POLICY IF EXISTS "Allow public read access to roles" ON public.rol;
DROP POLICY IF EXISTS "Allow public read access to order types" ON public.claseorden;
DROP POLICY IF EXISTS "Allow full access to orders" ON public.ordenpedido;
DROP POLICY IF EXISTS "Allow full access to responsible orders" ON public.responsableorden;

-- Create policies that allow anonymous access (for internal business app)
CREATE POLICY "Enable read access for all users" ON public.cliente
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Enable read access for all users" ON public.proyecto
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Enable read access for all users" ON public.usuario
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Enable read access for all users" ON public.rol
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Enable read access for all users" ON public.claseorden
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Enable all access for orders" ON public.ordenpedido
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable all access for responsible orders" ON public.responsableorden
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);