const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const loginGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, usuario] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ total, usuario });
};

const loginPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en DB
  await usuario.save();

  res.json({ usuario });
};

const loginPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO validar contra base de datos

  if (password) {
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};

const loginDelete = async (req, res = response) => {
  const { id } = req.params;
  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({ msg: "DELETE API - Controlador", id });
};

module.exports = {
  loginGet,
  loginPost,
  loginPut,
  loginDelete,
};
