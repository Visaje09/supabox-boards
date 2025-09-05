-- Insert basic roles
INSERT INTO rol (tipo_rol) VALUES 
('comercial'),
('inventarios'),
('produccion'),
('logistica'),
('facturacion'),
('financiera');

-- Insert basic users for testing
INSERT INTO usuario (nombre_usuario, contrasena, id_rol) VALUES 
('Ana García', 'password123', 1),
('Carlos Ruiz', 'password123', 1),
('María López', 'password123', 2),
('Juan Pérez', 'password123', 3),
('Laura Martín', 'password123', 4),
('Pedro Sánchez', 'password123', 5),
('Sofia Torres', 'password123', 6);

-- Insert order types
INSERT INTO claseorden (tipo_orden) VALUES 
('Venta'),
('Servicio'),
('Garantía'),
('Mantenimiento'),
('Instalación');