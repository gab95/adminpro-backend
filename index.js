require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

const usuarioRoutes = require("./routes/usuarios.routes");
const authRoutes = require("./routes/auth.routes");
const hospitalRoutes = require("./routes/hospital.routes");
const medicosRoutes = require("./routes/medicos.routes");
const busquedaRoutes = require("./routes/busqueda.routes");
const uploadsRoutes = require("./routes/uploads.routes");

const app = express();

//middlewares
app.use(cors());

app.use(express.json());

//base de datos
dbConnection();

//directorio publico
app.use(express.static("public"));

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/todo", busquedaRoutes);
app.use("/api/hospitales", hospitalRoutes);
app.use("/api/medicos", medicosRoutes);
app.use("/api/upload", uploadsRoutes);

app.listen(process.env.PORT, () => {
  console.log("servidor corriendo en puerto 3000");
});
