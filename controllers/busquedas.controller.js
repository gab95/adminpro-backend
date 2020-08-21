const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

exports.getTodo = async (req, res, next) => {
  try {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");

    const [usuarios, medicos, hospitales] = await Promise.all([
      Usuario.find({ nombre: regex }),
      Medico.find({ nombre: regex }),
      Hospital.find({ nombre: regex }),
    ]);

    return res.status(200).json({
      ok: true,
      busqueda,
      usuarios,
      medicos,
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

exports.getDocuentosColeccion = async (req, res, next) => {
  try {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda, "i");

    let data;

    switch (tabla) {
      case "medicos":
        data = await Medico.find({ nombre: regex })
          .populate("usuario", "nombre img")
          .populate("hospital", "nombre img");

        break;
      case "hospitales":
        data = await Hospital.find({ nombre: regex }).populate(
          "usuario",
          "nombre img"
        );

        break;
      case "usuarios":
        data = await Usuario.find({ nombre: regex });
        break;

      default:
        return res.status(400).json({
          ok: false,
          msg: "La tabla debe de ser usuarios-medicos-hospitales ",
        });
        break;
    }

    return res.status(200).json({
      ok: true,
      coleccion: tabla,
      resultados: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... Revisar logs",
    });
  }
};
