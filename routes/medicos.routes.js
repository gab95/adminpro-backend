const { Router } = require("express");
const validator = require("express-validator");
const { check } = require("express-validator");

const medicosController = require("../controllers/medicos.controller");
const { validarCampo } = require("../middlewares/validar-campo");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(validarJWT);

router
  .route("/")
  .get([], medicosController.getMedicos)
  .post(
    [
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("hospital", "El hospital id debe de ser válido").isMongoId(),
      validarCampo,
    ],
    medicosController.crearMedico
  );

router
  .route("/:id")
  .put(
    [
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("hospital", "El hospital id debe de ser válido").isMongoId(),
      validarCampo,
    ],
    medicosController.actualizarMedico
  )
  .delete(medicosController.borrarMedicos);

module.exports = router;
