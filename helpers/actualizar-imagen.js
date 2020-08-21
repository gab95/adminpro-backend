const fs = require("fs");

const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const actualizarImagen = async (Model, id, tipo, nombreArchivo) => {
  const doc = await Model.findById(id);
  if (!doc) {
    return false;
  }

  const pathViejo = `./uploads/${tipo}/${doc.img}`;
  if (fs.existsSync(pathViejo)) {
    //borrar la imagen
    fs.unlinkSync(pathViejo);
  }

  doc.img = nombreArchivo;
  await doc.save();
  return true;
};

exports.actualizarImagen = async (tipo, id, nombreArchivo) => {
  switch (tipo) {
    case "medicos":
      actualizarImagen(Medico, id, tipo, nombreArchivo);
      break;

    case "hospitales":
      actualizarImagen(Hospital, id, tipo, nombreArchivo);
      break;

    case "usuarios":
      actualizarImagen(Usuario, id, tipo, nombreArchivo);
      break;

    default:
      break;
  }
};
