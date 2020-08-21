const { response } = require("express");

const Hospital = require("../models/hospital");

exports.getHospitales = async (req, res = response, next) => {
  try {
    const hospitales = await Hospital.find().populate("usuario", "nombre img");

    return res.status(200).json({
      ok: true,
      hospitales,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

exports.getHospitalById = (req, res = response, next) => {
  return res.status(200).json({
    ok: true,
    msg: "get hospital by id",
  });
};

exports.crearHospital = async (req, res = response, next) => {
  try {
    req.body.usuario = req.uid;
    const hospital = await Hospital.create(req.body);

    // const hospital = new Hospital(req.body);
    // hospital.usuario = req.uid;
    // await hospital.save();

    return res.status(200).json({
      ok: true,
      hospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

exports.actualizarHospital = (req, res = response, next) => {
  return res.status(200).json({
    ok: true,
    msg: "actualizar hospital",
  });
};

exports.borrarHospitales = (req, res = response, next) => {
  return res.status(200).json({
    ok: true,
    msg: "borrar hospital",
  });
};

//6. crear medicos
