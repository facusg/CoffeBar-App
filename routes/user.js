const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  esAdminRole,
  tieneRole,
  validarJWT,
} = require("../middlewares");
const {
  esRoleValido,
  existeEmail,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  loginGet,
  loginPost,
  loginPut,
  userDelete,
} = require("../controllers/userController");
const router = Router();

router.get("/", loginGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 8 caracteres").isLength({
      min: 8,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(existeEmail),
    //check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  loginPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),

    validarCampos,
  ],
  loginPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  userDelete
);

module.exports = router;
