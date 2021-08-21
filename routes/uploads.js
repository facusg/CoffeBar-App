const { Router } = require("express");
const { check } = require("express-validator");

const { cargarArchivo, actualizarImagen } = require("../controllers/uploads");
const { validarCampos, validarArchivo } = require("../middlewares");
const { coleccionesPermitidas } = require("../helpers");
const router = Router();

//Agregar validaciones
router.post("/", validarArchivo, cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarArchivo,
    check("id", "El id debe de ser de mongoDB").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagen
);

module.exports = router;
