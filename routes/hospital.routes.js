const { Router } = require("express");
const validator = require("express-validator");
const { check } = require("express-validator");

const hopitalesController = require("../controllers/hospitales.controller");
const { validarCampo } = require("../middlewares/validar-campo");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(validarJWT);

router
  .route("/")
  .get([], hopitalesController.getHospitales)
  .post(
    [check("nombre", "El nombre es obligatorio").not().isEmpty(), validarCampo],
    hopitalesController.crearHospital
  );

router
  .route("/:id")
  .put(
    [check("nombre", "El nombre es obligatorio").not().isEmpty(), validarCampo],
    hopitalesController.actualizarHospital
  )
  .delete(hopitalesController.borrarHospitales);

module.exports = router;
