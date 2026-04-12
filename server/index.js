const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect= require("./src/config/db")

const app = express();
const port = process.env.PORT || 3000;

// database connect
dbConnect()

// middlewares
app.use(cors())
app.use(express.static("public"))
app.use(express.json())
app.use(cookieParser())

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
