import mongoose from "mongoose";
import color from "colors";

const conectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Conectado a Mongo DB Database ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in mongoDB ${error}`.bgRed.white);
  }
};

export default conectDB;
