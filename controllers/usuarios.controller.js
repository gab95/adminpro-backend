const bcrypt = require("bcryptjs");
const { response } = require("express");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

exports.getUsuarios = async (req, res, next) => {
  const desde = +req.query.desde || 0;

  const [usuarios, totalRegistros] = await Promise.all([
    Usuario.find({}, "nombre email role google img").skip(desde).limit(5),
    Usuario.estimatedDocumentCount(),
  ]);

  return res.json({
    ok: true,
    totalRegistros,
    usuarios,
    uid: req.uid,
  });
};

exports.crearUsuario = async (req, res = response, next) => {
  const { email, password, nombre } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }

    const usuario = new Usuario(req.body);

    //encriptar contraseña
    usuario.password = await bcrypt.hash(password, 10);

    await usuario.save();
    const token = await generarJWT(usuario.id);

    return res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

exports.actualizarUsuario = async (req, res = response, next) => {
  //validar token y comprobar si usuario es correcto

  const uid = req.params.id;
  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con ese id",
      });
    }

    //actualizaciones
    const { password, google, email, ...campos } = req.body;
    if (usuarioDB.email !== email) {
      const existeEmail = await Usuario.findOne({ email });

      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    if (!usuarioDB.google) {
      campos.email = email;
    } else if (usuarioDB.email !== email) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario de Google no pueden cambiar email",
      });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    return res.status(201).json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

exports.borrarUsuario = async (req, res = response, next) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe usuario con ese id",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    return res.status(201).json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};
//15.login de usuario
