const { Router } = require("express");
const validator = require("express-validator");
const { check } = require("express-validator");
const expressFileupload = require("express-fileupload");

const uploadsController = require("../controllers/uploads.controller");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(expressFileupload());

router.put("/:tipo/:id", validarJWT, uploadsController.fileUpload);

router.get("/:tipo/:foto", uploadsController.retornaImagen);

module.exports = router;
