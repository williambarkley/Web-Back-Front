const express = require("express");
const dbConnect = require("./config/mongodb");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { REQUEST } = require("./types");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const app = express();

const swaggerAutogen = require("swagger-autogen")();

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    if (req.headers["x-access-token"]) {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      // Check if token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(REQUEST.UNAUTHORIZED).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }

      const user = await User.findById(userId).lean();

      res.locals.userId = user._id.toString();
      next();
    } else {
      next();
    }
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
});
app.use("/", routes);

const doc = {
  info: {
    title: "Practica Servidor",
    description:
      "Tarea final con una API funcional para la creación de comercios, paginas web y usuarios",
  },
  host: "localhost:8000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);

app.listen(8000, () => {
  console.log("El servidor esta lanzado correctamente");
  dbConnect();
});
