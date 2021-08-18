const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const {
  validarJWT,
  validarCampos,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  existeProductoPorId,
  existeCategoriaPorId,
} = require("../helpers/db-validators");

const router = Router();

//Obtener Productos

router.get("/", obtenerProductos);

//Obtener Producto por Id

router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

//Crear Producto
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

//Actualizar un Producto
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

//Borrar un Producto
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;
