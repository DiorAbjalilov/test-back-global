const express = require("express");
const { signUp, login, logout } = require("../controller/userController");
const router = express.Router();
// for registering routes
router.post("/signup", signUp);
// for login routes
router.post("/login", login);
// for logout routes
router.get("/logout", logout);
module.exports = router;
