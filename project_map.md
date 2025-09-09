Project Map: ERP Gestión de Órdenes (Lovable)
Estructura General de la App
Órdenes de Pedido: Listado, creación, edición, consulta y gestión detallada por fases.

Por Gestionar: Pedidos con tareas pendientes de inventario, logística, facturación, etc.

Clientes y Proyectos: Catálogo de terceros, proyectos y vínculos de órdenes.

Productos y Servicios: Gestión centralizada de catálogos y variantes.

Reportes: Panel de informes parametrizables/exportables según filtros.

Configuración: Ajustes globales, gestión de usuarios, roles, transportadoras y catálogos.

Bitácora/Auditoría: Acceso a historial de acciones, cambios y trazabilidad en todo el ERP.

Barra Superior/Notificaciones: Estado de usuario, tareas pendientes, mensajes de sistema.

Relación de Páginas, Componentes y Funcionalidades
Menú Principal
Órdenes de Pedido

Detalle editable, cambio de estado visual ("Creado", "En validación", etc.), historial y totalización.

Roles y permisos condicionan acciones posibles (editar, cancelar, confirmar, exportar, etc.).

Validación de catálogos al guardar (cliente, producto).

Por Gestionar

Filtros rápidos para órdenes en procesos pendientes.

Clientes y Proyectos

Alta, consulta, edición, desactivación de clientes/proyectos.

Asociación múltiple órdenes–proyectos/cliente.

Productos y Servicios

Catálogo de productos, variantes y servicios.

Gestión de operadores, planes, servicios asociados.

Reportes

Generación y exportación de reportes detallados de órdenes, clientes, productos, facturación.

Filtrado avanzado por estado, cliente, fecha, tipo.

Configuración

Panel para catálogos generales: transportadoras, métodos de pago, tipos de orden, roles de usuario.

Administración de roles y permisos.

Bitácora/Auditoría

Consulta de historial visible y auditable por cambios en órdenes y entidades.

Estado detallado y responsable en cada cambio.

Detalle y Secciones de una Orden de Pedido
Cabecera: Identificador visible (Ej. “OP-[Código]”), estado visual, cliente, proyecto, comercial encargado, fechas, tipo de orden, condiciones y método de pago, lista de precios.

Líneas de Pedido: Tabla editable de productos/servicios, cantidad, valor, impuestos, descuentos, operador, plan, permanencia, observaciones.

Productos/Servicios Opcionales: Upselling, añadidos.

Logística y Despacho: Método y detalles de despacho, dirección/contacto, valor flete/seguro, estado/envío, historial.

Soporte/Observaciones: Comentarios internos, alertas técnicas, soporte y detalles técnicos.

Adjuntos: Documentos digitales de contrato, facturas, remisiones, soporte de entrega.

Trazabilidad/Historial: Cambios de usuario/estado por fase, timeline visual.

Notas: Espacio para apuntes visibles/internos según permisos.

Totalización: Subtotales, descuentos, impuestos, total general, términos y condiciones.

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

/api: endpoints/servicios para todas las entidades principales.

/utils: helpers para permisos, validaciones, matemática de impuestos/descuentos.

Tablas Principales Supabase (sin ingreso producción)
Tabla	Propósito/Descripción	Columnas relevantes
usuario	Usuarios del sistema y autenticación	idusuario, nombreusuario, contrasena, idrol
rol	Catálogo de roles y permisos	idrol, tiporol
responsableorden	Asignación multiárea de responsables y trazabilidad	idordenpedido, idusuario, idrol, timestamps
cliente	Catálogo de clientes para órdenes	idcliente, nombrecliente, nit
proyecto	Catálogo de proyectos por cliente	idproyecto, idcliente, nombreproyecto, descripcion
claseorden	Tipos de orden (Venta, Renta, Préstamo, Reposición, etc.)	idclaseorden, tipoorden
ordenpedido	Entidad central: cabecera de Órdenes	idordenpedido, estado, idcliente, idproyecto, fechas
detalleorden	Detalle de productos/servicios por orden	idordendetalle, idordenpedido, idproducto, cantidad
lineadetalle	Config. especial servicios (operador, plan, APN, permanencia, valor)	idlineadetalle, idordendetalle, idoperador, idplan
producto	Catálogo general de productos y servicios asociados	idproducto, tipoproducto, descripcion
metododespacho	Métodos y dirección/contactos de despacho	idmetododespacho, tipodespacho, direccion, contacto
transportadora	Catálogo de transportadoras	idtransportadora, nombretransportadora
remision	Remisiones y evidencia de entrega	idremision, numeroremision, fecharemision, idordenpedido
factura	Facturas y comprobantes por orden	idfactura, idordenpedido, fechafactura, estadofactura
tipopago	Formas y plazos de pago	idtipopago, formapago, plazo
operador	Catálogo operadores de servicio	idoperador, nombreoperador
plan	Catálogo de planes asociados a operadores	idplan, idoperador, nombreplan
apn	APN y configuración de líneas especiales	idapn, idoperador, configInfo (IP, etc.)
Relaciones y Flujos
Todas las operaciones requieren validación de FK antes de crear registros asociados para integridad.

Historial y responsable: Encapsulado en tabla responsableorden para trazabilidad multiárea, usuario, tiempo.

La lógica de edición/visualización siempre está filtrada por FK rol y estado de orden.

Cada área procesa solo los campos que necesita, pero la consulta de orden recupera todo el contexto via joins.
