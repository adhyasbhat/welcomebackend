const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require("./src/routes/usersroutes");
// const adminRouter = require("./src/routes/adminroutes");

const corsOptions = { origin: "http://localhost:5173" };
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

mongoose
  .connect("mongodb://localhost:27017/Welcome", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to server");
  })
  .catch((error) => {
    console.log("Error in connecting", error);
  });

app.use("/api", userRouter);
// app.use("/api", adminRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
