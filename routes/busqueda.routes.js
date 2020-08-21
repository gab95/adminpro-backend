const { Router } = require("express");
const validator = require("express-validator");
const { check } = require("express-validator");

const busquedasController = require("../controllers/busquedas.controller");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(validarJWT);

router.get("/:busqueda", busquedasController.getTodo);

router.get(
  "/coleccion/:tabla/:busqueda",
  busquedasController.getDocuentosColeccion
);

module.exports = router;
