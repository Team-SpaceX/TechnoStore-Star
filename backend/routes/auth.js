const express=require("express");
const router=express.Router();

const { newUser } = require("../controllers/authController");

router.route('/usuario/registro').post(newUser) //Registrar un usuario

module.exports=router;