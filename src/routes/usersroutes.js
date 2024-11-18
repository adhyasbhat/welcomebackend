const express = require("express")
const usercontroller = require("../controllers/usercontrollers")
const router = express.Router();

router.post("/register",usercontroller.registerUser)
router.post("/login",usercontroller.loginUser)

module.exports = router
