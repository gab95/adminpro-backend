const { Router } = require("express");
const validator = require("express-validator");
const { check } = require("express-validator");

const usuariosController = require("../controllers/usuarios.controller");
const { validarCampo } = require("../middlewares/validar-campo");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(validarJWT);

router
  .route("/")
  .get(usuariosController.getUsuarios)
  .post(
    [
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("password", "La contraseña es obligatoria").not().isEmpty(),
      check("email", "El email es obligatorio").isEmail(),
      validarCampo,
    ],
    usuariosController.crearUsuario
  );

router
  .route("/:id")
  .put(
    [
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("email", "El email es obligatorio").isEmail(),
      check("role", "El rol es obligatorio").not().isEmpty(),
      validarCampo,
    ],
    usuariosController.actualizarUsuario
  )
  .delete(usuariosController.borrarUsuario);

module.exports = router;
