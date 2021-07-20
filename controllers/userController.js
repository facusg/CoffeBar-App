const { response } = require("express");

const loginGet = (req, res = response) => {
  const { email, password } = req.query;
  res.json({ msg: "GET API - Controlador", email, password });
};

const loginPost = (req, res = response) => {
  const body = req.body;

  res.json({ msg: "POST API - Controlador", body });
};
const loginPut = (req, res = response) => {
  const id = req.params.id;
  res.json({ msg: "PUT API - Controlador", id });
};
const loginDelete = (req, res = response) => {
  res.json({ msg: "DELETE API - Controlador" });
};

module.exports = {
  loginGet,
  loginPost,
  loginPut,
  loginDelete,
};
