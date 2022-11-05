const User = require("../models/auth");

//Registrar un nuevo usuario
exports.newUser= async(req,res,next) =>{
    const user= await User.create(req.body);

    res.status(201).json({
        success:true,
        user
    })
}