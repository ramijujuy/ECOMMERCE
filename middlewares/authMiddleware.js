import JTW from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protegiendo rutas con el token

export const requiereSignIn = async (req, res, next) => {
  try {
    const decode = JTW.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
  }
};

// Acceso al administrador

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    console.log(user.role, user.name);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "el usuario no es administrador",
      });
    }
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      error,
      message: "error de isAdmin",
    });
    console.log(error);
  }
};
