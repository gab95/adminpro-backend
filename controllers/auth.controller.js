const bcrypt = require("bcryptjs");
const { response } = require("express");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

exports.googleSignIn = async (req, res = response, next) => {
  const googleToken = req.body.token;
  try {
    const { name, email, picture } = await googleVerify(googleToken);

    //verificar si existe email
    const usuarioDB = await Usuario.findOne({ email });
    let usuario;

    if (!usuarioDB) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      //existe usuario
      usuario = usuarioDB;
      usuario.google = true;
    }

    //guardar en bd
    await usuario.save();

    const token = await generarJWT(usuario.id);

    return res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "El token no es correcto",
    });
  }
};

exports.renewToken = async (req, res = response, next) => {
  const uid = req.uid;

  const token = await generarJWT(uid);

  res.status(200).json({
    ok: true,
    token,
  });
};
