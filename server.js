const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connect = require("./config/db");
const router = require("./router/router");

connect();
// configure dotenv
dotenv.config();
// port
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());

// api routers
app.use("/api", router);

// server running
app.listen(PORT, () => {
  console.log("********* server running on port 5051 *********");
});
