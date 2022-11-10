const express=require("express");
const router=express.Router();

const { newUser, getUsers } = require("../controllers/authController");

router.route('/usuarios').get(getUsers) //Listar usuario
router.route('/usuario/registro').post(newUser) //Registrar un usuario

module.exports=router;