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

//Iniciar Sesion - Login
exports.loginUser = async (req, res, next) => {
    const {email, password}= req.body;
    
    //Validacion de los campos completos
    if(!email  || !password){
        return next.status(400).json({
            success:false,
            message: 'Por favor ingrese un email y contraseña'
            })
    }
    
    //Validacion del usuario en la base de datos
    const user = await User.findOne({$and:[{email:email},{password:password}]})
    if (!user){
        return next.status(401).json({
        success:false,
        message: 'Email o contraseña invalidos!'
        })
    }

    //Crea la cookie y envia el response
    res.status(200).cookie("idUser", user._id).json({
        success:true,
        message: 'Usuario inicio sesion!',
        user,
    })
}

//Cerrar sesion (logout)
exports.logOut = async(req,res,next) =>{
    res.cookie("idUser",null,{
        expires:new Date(Date.now()),
        httpOnly: true
    })
    
    res.status(200).json({
        success: true,
        message: "Cerro sesión"
    })
}