const User = require("../models/auth");

//Registrar un nuevo usuario
exports.newUser= async(req,res,next) =>{
    const user= await User.create(req.body);

    res.status(201).json({
        success:true,
        user
    })
}

//Listar usuarios
exports.getUsers=async (req,res,next) =>{
    const users= await User.find();
    //Trae todos los usuarios de la coleccion y su cantidad
    res.status(200).json({
        success:true,
        count: users.length,
        users
    })
}