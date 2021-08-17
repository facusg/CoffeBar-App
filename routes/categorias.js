const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categoriasController");
const {
  validarJWT,
  validarCampos,
  esAdminRole,
  tieneRole,
} = require("../middlewares");
const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear una categoria por id - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar una categoria por id - privada - cualquier persona con un token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    check("nombre", "El nombre de la categoria es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

// Eliminar una categoria por id - privada - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un id de Mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
