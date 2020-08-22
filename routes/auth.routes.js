const { Router } = require("express");

const authController = require("../controllers/auth.controller");

const { check } = require("express-validator");
const { validarCampo } = require("../middlewares/validar-campo");
const { validarJWT } = require("../middlewares/validar-jwt");

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

router.post(
  "/google",
  [
    check("token", "El token de Google es obligatorio").not().isEmpty(),
    validarCampo,
  ],
  authController.googleSignIn
);

router.get("/renew", validarJWT, authController.renewToken);

module.exports = router;
