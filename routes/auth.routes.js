const { Router } = require("express");

const authController = require("../controllers/auth.controller");

const { check } = require("express-validator");
const { validarCampo } = require("../middlewares/validar-campo");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampo,
  ],
  authController.login
);

module.exports = router;
