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

exports.getMedicoById = async (req, res = response, next) => {
  const id = req.params.id;
  try {
    const medico = await Medico.findById(id)
      .populate("usuario", "nombre img")
      .populate("hospital", "nombre img");

    if (!medico) {
      return res.status(500).json({
        ok: false,
        msg: "No existe medico con ese id",
      });
    }

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

exports.actualizarMedico = async (req, res = response, next) => {
  const id = req.params.id;
  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(500).json({
        ok: false,
        msg: "No existe medico con ese id",
      });
    }

    const cambiosMedico = { ...req.body, usuario: req.uid };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      {
        new: true,
      }
    );

    return res.status(200).json({
      ok: true,
      medicoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};

exports.borrarMedicos = async (req, res = response, next) => {
  const id = req.params.id;
  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(500).json({
        ok: false,
        msg: "No existe medico con ese id",
      });
    }

    await Medico.findByIdAndDelete(id);

    return res.status(200).json({
      ok: true,
      msg: "Médico eliminado",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};
