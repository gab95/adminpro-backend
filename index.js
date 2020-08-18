require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

const usuarioRoutes = require("./routes/usuarios.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

//middlewares
app.use(cors());

app.use(express.json());

//base de datos
dbConnection();

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("servidor corriendo en puerto 3000");
});
