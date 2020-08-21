const { response } = require("express");

const Medico = require("../models/medico");

exports.getMedicos = async (req, res = response, next) => {
  try {
    const medicos = await Medico.find()
      .populate("usuario", "nombre img")
      .populate("hospital", "nombre");

    return res.status(200).json({
      ok: true,
      medicos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

exports.getMedicoById = (req, res = response, next) => {
  return res.status(200).json({
    ok: true,
    msg: "get Medico by id",
  });
};

exports.crearMedico = async (req, res = response, next) => {
  try {
    req.body.usuario = req.uid;
    const medico = await Medico.create(req.body);

    return res.status(200).json({
      ok: true,
      medico,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

exports.actualizarMedico = (req, res = response, next) => {
  return res.status(200).json({
    ok: true,
    msg: "actualizar Medico",
  });
};

exports.borrarMedicos = (req, res = response, next) => {
  return res.status(200).json({
    ok: true,
    msg: "borrar Medico",
  });
};
