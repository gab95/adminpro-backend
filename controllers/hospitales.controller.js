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

exports.actualizarHospital = async (req, res = response, next) => {
  const id = req.params.id;
  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(500).json({
        ok: false,
        msg: "No existe hospital con ese id",
      });
    }

    const cambiosHopital = { ...req.body, usuario: req.uid };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHopital,
      {
        new: true,
      }
    );

    return res.status(200).json({
      ok: true,
      hospitalActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

exports.borrarHospitales = async (req, res = response, next) => {
  const id = req.params.id;
  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(500).json({
        ok: false,
        msg: "No existe hospital con ese id",
      });
    }

    await Hospital.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      msg: "Hospital eliminado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};
