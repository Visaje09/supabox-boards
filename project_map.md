Project Map: ERP Gestión de Órdenes (Lovable)
Estructura General de la App
Órdenes de Pedido: Listado, creación, edición, consulta y gestión detallada en varias fases.

Por Gestionar: Panel de pedidos con tareas pendientes de inventario, logística, facturación, etc.

Clientes y Proyectos: Catálogo de terceros y sus proyectos, con vista de órdenes asociadas por cliente/proyecto.

Productos y Servicios: Gestión centralizada de catálogos y variantes.

Reportes: Panel de informes parametrizables y exportables por filtros avanzados.

Configuración: Ajustes globales, administración de usuarios, roles, transportadoras y catálogos generales.

Bitácora/Auditoría: Consultas de historial de acciones, cambios y trazabilidad global.

Barra Superior/Notificaciones: Estado de usuario activo, actividades, tareas pendientes y mensajes del sistema.

Relación de Páginas y Componentes
Menú Principal
Órdenes de Pedido

Detalle editable, cambio de estado visual (Creado, En validación, Listo para entrega, etc.), historial y totalización.

Acciones sujetas a roles y permisos (editar, cancelar, confirmar, exportar, etc.).

Validación de existencia en catálogos de cliente y producto al guardar.

Por Gestionar

Filtros rápidos sobre pedidos en fases pendientes según inventario, logística, facturación u otros.

Clientes y Proyectos

Alta, consulta, edición y desactivación de clientes y proyectos.

Relación múltiple entre órdenes, proyectos y cada cliente.

Productos y Servicios

Catálogo de productos, variantes y servicios.

Gestión de operadores, planes, servicios asociados.

Reportes

Generación y exportación de reportes detallados por pedido, cliente, producto o facturación.

Filtrado avanzado (estado, cliente, fecha, tipo).

Configuración

Panel para catálogos (transportadoras, métodos de pago, tipos de orden), usuarios, roles.

Administración granular de roles y permisos.

Bitácora/Auditoría

Consultas de historial visible y auditable por cambios y responsables de cada acción en cualquier entidad.

Detalle y Secciones de una Orden de Pedido
Cabecera:
Identificador visible (Ej. “OP-[Código]”), estado de la orden, cliente, proyecto, comercial encargado, fechas relevantes, tipo de orden, condiciones/método de pago, lista de precios.

Líneas de Pedido:
Tabla editable: productos/servicios, cantidad, precios unitarios y totales, impuestos/retenciones, descuentos, operador, plan, permanencia, observaciones.

Productos/Servicios Opcionales:
Upselling/agregados relacionados con la orden.

Logística y Despacho:
Método, transportadora, dirección y contacto de despacho, valor flete/seguro, estado/historial logístico.

Soporte/Observaciones:
Espacio para comentarios internos, alertas técnicas, soporte u observaciones detalladas.

Adjuntos:
Gestión de documentos digitales relevantes: contratos, remisiones, facturas, actas.

Trazabilidad/Historial:
Timeline visual de cambios de usuario, responsable, estado y mensajes/rechazos.

Notas:
Notas visibles/internas según permisos/rol.

Totalización:
Subtotal, impuestos, descuentos globales, total final en moneda del pedido, vista de términos y condiciones.

Estructura de Archivos/Componentes Clave
/pages

/ordenes: list, detail, create, edit

/clientes: catálogo, proyectos relacionados

/productos: catálogo, variantes

/reportes: panel y exportadores

/configuracion: catálogos, usuarios, roles, transportadoras

/auditoria: consultas de bitácora

/components

OrderDetail, OrderLineTable, ClientSelector, ProjectSelector, ProductSelector, ServiceUpsell, LogisticsPanel, AttachmentsPanel, AuditTimeline, NotesSection

/api: Endpoints/servicios para las entidades principales.

/utils: Helpers de permisos, validaciones, cálculos de impuestos/descuentos.

Tablas Principales Supabase (sin ingreso a producción)
Tabla	Propósito/Descripción	Columnas relevantes
usuario	Usuarios del sistema y autenticación	idusuario, nombreusuario, contrasena, idrol
rol	Catálogo de roles y permisos	idrol, tiporol
responsableorden	Trazabilidad y asignación de responsables por área/fase	idordenpedido, idusuario, idrol, timestamps
cliente	Catálogo de clientes para órdenes	idcliente, nombrecliente, nit
proyecto	Catálogo de proyectos por cliente	idproyecto, idcliente, nombreproyecto, descripcion
claseorden	Tipos de orden (Venta, Renta, Préstamo, Reposición, etc.)	idclaseorden, tipoorden
ordenpedido	Cabecera principal de órdenes	idordenpedido, estado, idcliente, idproyecto, fechas
detalleorden	Detalle de productos/servicios en cada orden	idordendetalle, idordenpedido, idproducto, cantidad
lineadetalle	Config. especial servicios (operador, plan, APN, valor)	idlineadetalle, idordendetalle, idoperador, idplan
producto	Catálogo general de productos y servicios	idproducto, tipoproducto, descripcion
metododespacho	Métodos/dirección/contactos para despachos	idmetododespacho, tipodespacho, direccion, contacto
transportadora	Catálogo de transportadoras	idtransportadora, nombretransportadora
remision	Remisiones y evidencia de entrega	idremision, numeroremision, fecharemision, idordenpedido
factura	Facturas y comprobantes por orden	idfactura, idordenpedido, fechafactura, estadofactura
tipopago	Formas y plazos de pago	idtipopago, formapago, plazo
operador	Catálogo operadores de servicio	idoperador, nombreoperador
plan	Catálogo de planes asociados a operadores	idplan, idoperador, nombreplan
apn	APN y configuración de líneas especiales	idapn, idoperador, configInfo (IP, etc.)
Relaciones y Flujos Clave
Todas las operaciones requieren validación de claves foráneas antes de crear registros dependientes para asegurar integridad de datos.

Todo cambio relevante queda traza y responsable en la tabla responsableorden para perfecta trazabilidad multiárea, por usuario y por tiempo.

La edición y visualización de las órdenes y registros se filtra por permisos y estado de la orden (según rol/FK).

Cada área/tab solo edita/consulta los campos que le corresponden, pero la vista consolidada de la orden recupera todo el contexto vía joins.

Flujo Tabulado de la Orden de Pedido
Creación de orden de pedido:
Datos de cliente, proyecto y comercial encargado.

Comercial Tab:
Productos (referencia), cantidad, servicios, líneas detalle (si aplica), clase de cobro, valor.

Inventarios Tab:

Asignación de equipos/servicios a la orden

Validación de disponibilidad de stock

Asignación técnica de SIM/plan/APN (si aplica)

Registro de responsable y fecha de asignación

Observaciones de inventarios y estado técnico

Bitácora de cambios y novedades

Producción Tab:
Gestión eficaz de la producción asociada y estado de los bienes/servicios.

Logística Tab:
Registro del despacho, datos de transportadoras, direcciones de entrega, historial logístico.

Facturación Tab:
Generación y control de facturación, comprobantes asociados.

Financiera Tab:
Control y registro de pagos, situación de cartera, términos y condiciones financieros.
