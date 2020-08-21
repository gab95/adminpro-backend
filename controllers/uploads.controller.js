const path = require("path");
const fs = require("fs");

const { v4: uuidv4 } = require("uuid");
const { actualizarImagen } = require("../helpers/actualizar-imagen");

exports.fileUpload = (req, res, next) => {
  const { tipo, id } = req.params;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un medico, hospital o usuario",
    });
  }

  //validar de q exista un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo",
    });
  }

  //procesar la imagen
  const file = req.files.imagen;
  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //validar extension
  const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es una extension permitida",
    });
  }

  //generar nombre del archivo
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  //path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  //mover la imagen
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }

    //actualizar la base de datos
    actualizarImagen(tipo, id, nombreArchivo);

    return res.status(200).json({
      ok: true,
      msg: "Archivo Subido",
      nombreArchivo,
    });
  });
};

exports.retornaImagen = async (req, res, next) => {
  const { tipo, foto } = req.params;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  //imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};
