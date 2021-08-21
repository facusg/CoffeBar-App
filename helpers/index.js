const dbValidator = require("./db-validators");
const generarJWT = require("./generarJWT");
const googleVerify = require("./google-verify");
const subirArchivo = require("./subir-archivo");

module.exports = {
  ...dbValidator,
  ...generarJWT,
  ...googleVerify,
  ...subirArchivo,
};
