const app=require("./app")
const connectDatabase = require("./config/database")
const cloudinary= require("cloudinary")

//Seteamos archivo de configuracion
if(process.env.NODE_ENV==="PRODUCTION") require('dotenv').config({path:'./config/config.env'})

connectDatabase(); //Llamado de la funcion para Conectar a la Db

//Configurar Cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Inicio del servidor
const server=app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})