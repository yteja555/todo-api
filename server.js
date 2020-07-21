const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const checkEnvironment = require("./config/checkEnvironment");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const todoRoute = require("./routes/todos");

//  load config
dotenv.config({ path: "./config/config.env" });

// check environment variables
checkEnvironment();

// initializing app
const app = express();

// connectiong to mmongodb
connectDB();

// middle wares

// body parsing middlewaring
app.use(express.json());

// handle cors
app.use(cors());

// logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// routes

// user route
app.use("/users", userRoute);

// auth route
app.use("/auth", authRoute);

// todo route
app.use("/todos", todoRoute);
app.get("/", (req, res) => {
  res.send("hello world");
});

// setting port number
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port : " + port);
});
