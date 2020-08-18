const bcrypt = require("bcryptjs");
const { response } = require("express");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

exports.login = async (req, res = response, next) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    const validPassword = await bcrypt.compare(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Contraseña no válida",
      });
    }

    //generar token
    const token = await generarJWT(usuarioDB.id);

    return res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error en el login",
    });
  }
};
