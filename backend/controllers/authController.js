const User = require("../models/auth");
const ErrorHandler= require("../utils/errorHandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary= require("cloudinary")

//Registrar un nuevo usuario
exports.newUser= catchAsyncErrors( async (req, res, next) => {
    const { name, email, password } = req.body;

    const result= await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder:"avatars",
        width:240,
        crop:"scale"
    })

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:result.public_id,
            url:result.secure_url
        }
    })
    sendToken(user,201,res)
})

//Iniciar Sesion - Login
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const {email, password}= req.body;

    //Validacion de los campos completos
    if(!email  || !password){
        return next( new ErrorHandler("Por favor ingrese email & Contraseña", 400))
    }
    
    //Validacion del usuario en la base de datos
    const user = await User.findOne( {email}).select( "+password")
    if (!user){
        return next( new ErrorHandler("Email o contraseña invalidos", 401))
    }

    //Comparar contraseñas, verificar si está bien
    const checkPassword= await user.compararPass(password);

    if (!checkPassword){
        return next( new ErrorHandler( "Contraseña invalida",401))
    }

    sendToken(user,200,res)
})

//Cerrar sesion (logout)
exports.logOut = catchAsyncErrors( async (req, res, next) => {
    res.cookie( "token",null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Cerró sesión"
    })
})

//Olvide mi contraseña, recuperar contraseña
exports.forgotPassword = catchAsyncErrors ( async( req, res, next) =>{
    const user= await User.findOne({email: req.body.email});

    if (!user){
        return next( new ErrorHandler( "Usuario no se encuentra registrado", 404 ))
    }
    const resetToken= user.genResetPasswordToken();
    
    await user.save( {validateBeforeSave: false })

    //Crear una url para hacer el reset de la contraseña
    const resetUrl= `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`;

    const mensaje=`Hola!\n\nTu link para ajustar una nueva contraseña es el siguiente: \n\n${resetUrl}\n\n
    Si no solicitaste este link, por favor comunicate con soporte.\n\n Att:\nTechnoStore-Star`

    try{
        await sendEmail({
            email: user.email,
            subject: "TechnoStore-Star Recuperación de la contraseña",
            mensaje
        })
        res.status(200).json({
            success: true,
            message: `Correo enviado a: ${user.email}`
        })
    }catch(error){
        user.resetPasswordToken= undefined;
        user.resetPasswordExpire= undefined;

        await user.save( {validateBeforeSave:false} );
        return next( new ErrorHandler(error.message, 500) )
    }
})

//Resetear la contraseña
exports.resetPassword = catchAsyncErrors(async (req,res,next) =>{
    //Hash el token que llego con la URL
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex");
    
    //Busca el usuario para resetear su la contraseña
    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })
    
    //El usuario si esta en la base de datos?
    if(!user){
        return next( new ErrorHandler("El token es invalido o ya expiró", 400))
    }
    
    //Ambos campos son iguales?
    if (req.body.password!==req.body.confirmPassword) {
        return next (new ErrorHandler("Contraseñas no coinciden",400))
    }
    
    //Setear la nueva contraseñá
    user.password=req.body.password;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpire= undefined;

    await user.save();
    sendToken (user,200,res)
})

//Ver perfil del usuario logueado
exports.getUserProfile= catchAsyncErrors( async(req,res,next) =>{
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success:true,
        user
    })
})

//Update contraseña del usuario logueado
exports.updatePassword= catchAsyncErrors( async(req, res, next) =>{
    const user=  await User.findById( req.user.id ).select( "+password");
    
    //Revisamos si la contraseña vieja es igual a la nueva
    const areEqual= await user.compararPass(req.body.oldPassword)

    if (!areEqual) {
        return next( new ErrorHandler("La contraseña actual no es correcta",401))
    }

    user.password= req.body.newPassword;
    
    await user.save();

    sendToken( user, 200, res );
})

//Update perfil del usuario logueado
exports.updateProfile= catchAsyncErrors( async (req,res,next) => {
    
    const newUserData ={
        name: req.body.name,
        email: req.body.email
    }

    //Update Avatar
    if (req.body.avatar !== ""){
        const user= await User.findById( req.user.id )
        const image_id= user.avatar.public_id;
        const res= await cloudinary.v2.uploader.destroy( image_id);

        const result= await cloudinary.v2.uploader.upload( req.body.avatar, {
            folder: "avatars",
            width: 240,
            crop: "scale"
        })

        newUserData.avatar= {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        user
    })
})

//Servicios controladores sobre usuarios por parte de los ADMIN

//Ver todos los usuarios
exports.getAllUsers = catchAsyncErrors( async (req, res, next) =>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

//Ver el detalle de un usuario
exports.getUserDetails= catchAsyncErrors( async (req, res, next) => {
    const user= await User.findById( req.params.id);

    if (!user){
        return next(new ErrorHandler(`No se ha encontrado ningun usuario con el id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Actualizar perfil de un usuario 
exports.updateUser= catchAsyncErrors ( async( req, res, next) => {
    const newData={
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user= await User.findByIdAndUpdate( req.params.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        user
    })
})

//Eliminar usuario (admin)
exports.deleteUser= catchAsyncErrors (async ( req, res, next)=>{
    const user = await User.findById( req.params.id);

    if(!user){
        return next(new ErrorHandler(`Usuario con id: ${req.params.id} no se encuentra en nuestra base de datos`))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente"
    })
})