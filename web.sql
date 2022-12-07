SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for abonos
-- ----------------------------
DROP TABLE IF EXISTS `abonos`;
CREATE TABLE `abonos`  (
  `id` int NOT NULL,
  `venta_id` int NULL DEFAULT NULL,
  `cliente_id` int NULL DEFAULT NULL,
  `metodo_pago_id` int NULL DEFAULT NULL,
  `referencia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `precio_total` decimal(10, 2) NOT NULL,
  `precio_base_total` decimal(10, 2) NOT NULL,
  `precio_iva_total` decimal(10, 2) NOT NULL,
  `fecha_emision` date NOT NULL,
  `hora_emision` time(6) NOT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of abonos
-- ----------------------------

-- ----------------------------
-- Table structure for abonos_detalle
-- ----------------------------
DROP TABLE IF EXISTS `abonos_detalle`;
CREATE TABLE `abonos_detalle`  (
  `id` int NOT NULL,
  `abono_id` int NULL DEFAULT NULL,
  `producto_id` int NULL DEFAULT NULL,
  `cantidad` int NOT NULL,
  `precio` decimal(6, 2) UNSIGNED NOT NULL,
  `unidad_medida` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre_producto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `tipo_iva` int NULL DEFAULT NULL,
  `creado` timestamp(0) NOT NULL,
  `actualizado` timestamp(0) NOT NULL,
  `eliminado` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of abonos_detalle
-- ----------------------------

-- ----------------------------
-- Table structure for carrito
-- ----------------------------
DROP TABLE IF EXISTS `carrito`;
CREATE TABLE `carrito`  (
  `id` int NOT NULL,
  `cliente_id` int NULL DEFAULT NULL,
  `fingerprint_id` int NULL DEFAULT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of carrito
-- ----------------------------

-- ----------------------------
-- Table structure for carrito_detalle
-- ----------------------------
DROP TABLE IF EXISTS `carrito_detalle`;
CREATE TABLE `carrito_detalle`  (
  `id` int NOT NULL,
  `carrito_id` int NULL DEFAULT NULL,
  `producto_id` int NULL DEFAULT NULL,
  `cantidad` int UNSIGNED NOT NULL,
  `precio` decimal(6, 2) UNSIGNED NOT NULL,
  `unidad_medida` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre_producto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `tipo_iva` int NULL DEFAULT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of carrito_detalle
-- ----------------------------

-- ----------------------------
-- Table structure for clientes
-- ----------------------------
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes`  (
  `id` int NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `poblacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `codigo_postal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `carrito_id` int NULL DEFAULT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  `visible` tinyint(1) NULL DEFAULT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of clientes
-- ----------------------------

-- ----------------------------
-- Table structure for contacto
-- ----------------------------
DROP TABLE IF EXISTS `contacto`;
CREATE TABLE `contacto`  (
  `id` int NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `mensaje` text CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `fingerprint_id` int NULL DEFAULT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  `visible` tinyint(1) NULL DEFAULT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contacto
-- ----------------------------

-- ----------------------------
-- Table structure for datos_empresa_(soft)
-- ----------------------------
DROP TABLE IF EXISTS `datos_empresa_(soft)`;
CREATE TABLE `datos_empresa_(soft)`  (
  `id` int NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `telefono` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `movil` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `cif` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `horario_apertura` time(6) NULL DEFAULT NULL,
  `horario_cierre` time(6) NULL DEFAULT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NOT NULL,
  `visible` tinyint(1) NULL DEFAULT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for datos_empresa
-- ----------------------------
DROP TABLE IF EXISTS `datos_empresa`;
CREATE TABLE `datos_empresa`  (
  `id` int NOT NULL,
  `opcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `valor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `creado` timestamp(0) NOT NULL,
  `actualizado` timestamp(0) NOT NULL,
  `eliminado` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Records of datos_empresa_(soft)
-- ----------------------------

-- ----------------------------
-- Table structure for errores_venta
-- ----------------------------
DROP TABLE IF EXISTS `errores_venta`;
CREATE TABLE `errores_venta`  (
  `id` int NOT NULL,
  `metodo_pago_id` int NOT NULL,
  `cliente_id` int NOT NULL,
  `carrito_id` int NOT NULL,
  `codigo_error` int UNSIGNED NOT NULL,
  `mensaje_error` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  `visible` tinyint(1) NULL DEFAULT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of errores_venta
-- ----------------------------

-- ----------------------------
-- Table structure for fingerprint
-- ----------------------------
DROP TABLE IF EXISTS `fingerprint`;
CREATE TABLE `fingerprint`  (
  `id` int NOT NULL,
  `client_id` int NULL DEFAULT NULL,
  `fingerprint` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `creado` timestamp(6) NULL DEFAULT NULL,
  `actualizado` timestamp(6) NULL DEFAULT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fingerprint
-- ----------------------------

-- ----------------------------
-- Table structure for imagenes_configuracion
-- ----------------------------
DROP TABLE IF EXISTS `imagenes_configuracion`;
CREATE TABLE `imagenes_configuracion`  (
  `id` int NOT NULL,
  `entity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `directory` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `grid` enum('original','desktop','mobile','preview') CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `extension_conversion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `content_accept` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `width_px` int UNSIGNED NOT NULL,
  `height_px` int UNSIGNED NOT NULL,
  `quality` int UNSIGNED NOT NULL,
  `creado` timestamp(0) NOT NULL,
  `actualizado` timestamp(0) NULL DEFAULT NULL,
  `eliminado` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of imagenes_configuracion
-- ----------------------------

-- ----------------------------
-- Table structure for imagenes_originales
-- ----------------------------
DROP TABLE IF EXISTS `imagenes_originales`;
CREATE TABLE `imagenes_originales`  (
  `id` int NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `entity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `entity_id` int NOT NULL,
  `lenguage_alias` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `mime_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `size_bytes` int UNSIGNED NOT NULL,
  `width_px` int UNSIGNED NOT NULL,
  `height_px` int UNSIGNED NOT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of imagenes_originales
-- ----------------------------

-- ----------------------------
-- Table structure for imagenes_redimensionadas
-- ----------------------------
DROP TABLE IF EXISTS `imagenes_redimensionadas`;
CREATE TABLE `imagenes_redimensionadas`  (
  `image_original_id` int UNSIGNED NOT NULL,
  `image_configuration_id` int UNSIGNED NULL DEFAULT NULL,
  `title` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `alt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `entity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `entity_id` int NOT NULL,
  `lenguage_alias` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `mime_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `grid` enum('desktop','mobile','preview') CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `size_bytes` int NOT NULL,
  `width_px` int UNSIGNED NULL DEFAULT NULL,
  `height_px` int UNSIGNED NULL DEFAULT NULL,
  `quality` int UNSIGNED NOT NULL,
  `creado` timestamp(0) NOT NULL,
  `actualizado` timestamp(0) NOT NULL,
  `eliminado` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`image_original_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of imagenes_redimensionadas
-- ----------------------------

-- ----------------------------
-- Table structure for ivas
-- ----------------------------
DROP TABLE IF EXISTS `ivas`;
CREATE TABLE `ivas`  (
  `id` int NOT NULL,
  `tipo` int UNSIGNED NOT NULL,
  `vigente` tinyint(1) NOT NULL,
  `creado` timestamp(0) NOT NULL,
  `actualizado` timestamp(0) NOT NULL,
  `eliminado` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ivas
-- ----------------------------

-- ----------------------------
-- Table structure for lenguage
-- ----------------------------
DROP TABLE IF EXISTS `lenguage`;
CREATE TABLE `lenguage`  (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `alias` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NULL DEFAULT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lenguage
-- ----------------------------

-- ----------------------------
-- Table structure for locale
-- ----------------------------
DROP TABLE IF EXISTS `locale`;
CREATE TABLE `locale`  (
  `id` int NOT NULL,
  `lenguage_alias` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `entity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `entity_key` int UNSIGNED NOT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of locale
-- ----------------------------

-- ----------------------------
-- Table structure for metodos_de_pago
-- ----------------------------
DROP TABLE IF EXISTS `metodos_de_pago`;
CREATE TABLE `metodos_de_pago`  (
  `id` int NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `creado` timestamp(0) NOT NULL,
  `actualizado` timestamp(0) NOT NULL,
  `eliminado` timestamp(0) NULL DEFAULT NULL,
  `visible` tinyint(1) NULL DEFAULT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of metodos_de_pago
-- ----------------------------

-- ----------------------------
-- Table structure for productos
-- ----------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`  (
  `id` int NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `precio` decimal(6, 2) UNSIGNED NULL DEFAULT NULL,
  `iva_id` int NULL DEFAULT NULL,
  `destacado` tinyint(1) NULL DEFAULT NULL,
  `categoria_id` int NULL DEFAULT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of productos
-- ----------------------------

-- ----------------------------
-- Table structure for productos_categorias
-- ----------------------------
DROP TABLE IF EXISTS `productos_categorias`;
CREATE TABLE `productos_categorias`  (
  `id` int NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `creado` timestamp(0) NOT NULL,
  `actualizado` timestamp(0) NOT NULL,
  `eliminado` timestamp(0) NULL DEFAULT NULL,
  `visible` tinyint(1) NULL DEFAULT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of productos_categorias
-- ----------------------------

-- ----------------------------
-- Table structure for sliders
-- ----------------------------
DROP TABLE IF EXISTS `sliders`;
CREATE TABLE `sliders`  (
  `id` int NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  `visible` tinyint(1) NULL DEFAULT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sliders
-- ----------------------------

-- ----------------------------
-- Table structure for ventas
-- ----------------------------
DROP TABLE IF EXISTS `ventas`;
CREATE TABLE `ventas`  (
  `id` int NOT NULL,
  `carrito_id` int NULL DEFAULT NULL,
  `cliente_id` int NULL DEFAULT NULL,
  `metodo_pago_id` int NULL DEFAULT NULL,
  `referencia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `precio_total` decimal(10, 2) UNSIGNED NOT NULL,
  `precio_base_total` decimal(10, 2) UNSIGNED NOT NULL,
  `precio_iva_total` decimal(10, 2) UNSIGNED NOT NULL,
  `fecha_emision` date NOT NULL,
  `hora_emision` time(6) NOT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  `visible` tinyint(1) NULL DEFAULT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ventas
-- ----------------------------

-- ----------------------------
-- Table structure for ventas_detalle
-- ----------------------------
DROP TABLE IF EXISTS `ventas_detalle`;
CREATE TABLE `ventas_detalle`  (
  `id` int NOT NULL,
  `venta_id` int NULL DEFAULT NULL,
  `producto_id` int NULL DEFAULT NULL,
  `cantidad` int UNSIGNED NOT NULL,
  `precio` decimal(6, 2) UNSIGNED NOT NULL,
  `unidad_medida` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre_producto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `tipo_iva` int NULL DEFAULT NULL,
  `creado` timestamp(6) NOT NULL,
  `actualizado` timestamp(6) NOT NULL,
  `eliminado` timestamp(6) NULL DEFAULT NULL,
  `visible` tinyint(1) NULL DEFAULT NULL,
  `activo` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_spanish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ventas_detalle
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;