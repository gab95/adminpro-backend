const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

exports.validarJWT = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      of: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }
};

exports.validarAdminRole = async (req, res, next) => {
  const uid = req.uid;
  try {
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(404).json({
        of: false,
        msg: "Usuario no existe",
      });
    }

    if (usuario.role !== "admin_role") {
      return res.status(403).json({
        of: false,
        msg: "No tiene privilegios para realizar la acción",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

exports.validarAdminRoleOMismoUsuario = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(404).json({
        of: false,
        msg: "Usuario no existe",
      });
    }

    if (usuario.role === "admin_role" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        of: false,
        msg: "No tiene privilegios para realizar la acción",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};
