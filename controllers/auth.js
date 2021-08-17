const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  console.log(correo, password);
  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correcto - Correo" });
    }

    // Si el usuario esta activo
    if (!usuario.estado) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correcto - Estado:false" });
    }
    // Verificar la contraseña

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correcto - Password" });
    }

    // Generar el JWT

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Hable con el administrador" });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, correo, imagen } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: "12345678",
        imagen,
        google: true,
      };
      usuario = new Usuario(data);
      await usuario.save();
    }

    if (!usuario.estado) {
      return res
        .status(401)
        .json({ msg: "Hable con el administrador - usuario bloqueado" });
    }

    const token = await generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Token de google no es valido" });
  }
};

module.exports = { login, googleSignIn };
