require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./database/config");

const app = express();

//middlewares
app.use(cors());

//base de datos
dbConnection();

app.listen(process.env.PORT, () => {
  console.log("servidor corriendo en puerto 3000");
});
