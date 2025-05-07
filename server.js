const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const admiRoutes = require("./routes/authRoutes");
const entryRouters = require("./routes/entryRoutes");

const mongoDB = require("./config/db");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------- All Routes are Write here

app.use("/admin", admiRoutes);
app.use("/", entryRouters);
// ----------------

app.listen(5000, () => {
  console.log("Server is Running on PORT 5000");
  mongoDB();
});
