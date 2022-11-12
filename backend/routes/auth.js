const express=require("express");
const router=express.Router();

const { newUser, getUsers, loginUser, logOut } = require("../controllers/authController");

router.route('/usuarios').get(getUsers) //Listar los usuarios
router.route('/usuario/registro').post(newUser) //Registrar un nuevo usuario
router.route('/login').post(loginUser) //Inicio de sesion de un usuario
router.route('/logout').get(logOut) //Cerrar sesion

module.exports=router;