const app=require("./app")
const connectDatabase = require("./config/database")

//Seteo del archivo de configuracion
const dotenv=require("dotenv");
dotenv.config({path: './config/config.env'})

connectDatabase(); //Llamado de la funcion para Conectar a la Db

//Inicio del servidor
const server=app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto: ${process.env.PORT} en modo: ${process.env.NODE_ENV}`)
})