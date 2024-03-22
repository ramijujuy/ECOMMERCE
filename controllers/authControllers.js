import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import pruebaModel from "../models/pruebaModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  console.log("llego al registercontroller");
  try {
    const { name, email, password, telefono, direccion } = req.body;
    //validaciones

    if (!name) {
      return res.send({ message: "no ingreso el nombre" });
    }
    if (!email) {
      return res.send({ message: "no ingreso el mail" });
    }
    if (!telefono) {
      return res.send({ message: "Telefono requerido" });
    }
    if (!direccion) {
      return res.send({ message: "no ingreso Direccion" });
    }

    if (!password) {
      return res.send({ message: "Password no Valido" });
    }

    // verifica si existe el usuario

    const existeUser = await userModel.findOne({ email });

    if (existeUser) {
      return res.status(200).send({
        succes: false,
        message: "El usuario ya existe",
      });
    }

    // Registrando usuario

    const hashedPassword = await hashPassword(password);

    // Guadando usuario

    const user = await new userModel({
      name,
      email,
      telefono,
      direccion,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      succes: true,
      message: "Usuario Registrado con exito",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "Error en la Registracion",
      message,
    });
  }
};

// POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Email o password invalidos",
      });
    }

    //check usuario

    const user = await userModel.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "No existe el usuario",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Password incorrecto",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Logueado correctamente",
      user: {
        name: user.name,
        email: user.email,
        telefono: user.telefono,
        direccion: user.direccion,
      },

      token,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "message de logueo",
      message,
    });
  }
};

export const registerPrueba = async (req, res) => {
  console.log("llego el register prueba");
  try {
    const { nombre } = req.body;
    console.log(nombre);

    if (!nombre) return res.send({ message: "no ingreso el nombre" });

    const existeUser = await pruebaModel.findOne({ nombre });

    console.log(existeUser);

    if (existeUser) {
      console.log("entro al if");
      return res.status(200).send({
        succes: true,
        message: "El usuario ya existe",
      });
    }

    // Guadando usuario

    const user = await new pruebaModel({
      nombre,
    }).save();

    res.status(201).send({
      succes: true,
      message: "Usuario Registrado",
      user,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      succes: false,
      message: "Error en la Registracion",
      message,
    });
  }
};

// test controller

export const testController = (req, res) => {
  console.log("proteccion de rutas test");
  res.status(200).send({
    succes: true,
    message: "todo ok",
  });
};

//prueba de listado

export const listado = async (req, res) => {
  console.log("prueba de listado");
  const nombre = "mayra";
  // Find all users

  const users = await userModel.findOne({ name: nombre });

  return res.status(200).send(users);
};
