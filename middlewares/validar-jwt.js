const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ msg: "No hay token en la peticion" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res
        .status(400)
        .json({ msg: "Token no valido - usuario no existe en DB" });
    }

    //verificar si el id tiene estado en true most

    if (!usuario.estado) {
      return res
        .status(400)
        .json({ msg: "Token no valido - usuario con estado: false" });
    }

    req.usuario = usuario;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Token no valido" });
  }
};

module.exports = {
  validarJWT,
};
