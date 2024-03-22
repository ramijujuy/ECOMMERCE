//Aqui podemos usar el requiere o el import segun en el packagejson le pongamos despues de main type: module
// entonces reemplazarias el por ejemplo abajo const express = require("express")

import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import conectDB from "./config/db.js";
import authRouters from "./routes/authRoute.js";
import cors from "cors";

// configure env

dotenv.config();

//rest objet

const app = express();

//Database config

conectDB();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes

app.use("/api/v1/auth", authRouters);

//rest api

app.get("/", (req, res) => {
  res.send({
    message: "Bienvenidos a la Ecommers App",
  });
});

//port

const PORT = process.env.PORT || 8080;

// run listen

app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto ${PORT}`);
});
