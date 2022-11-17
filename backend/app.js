const express=require("express");
const app = express();
const errorMiddleware= require("./middleware/errors")
const cookieParser= require("cookie-parser")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

//Uso de constantes importadas
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//Importar rutas
const productos=require("./routes/products")
const usuarios=require("./routes/auth")
const ordenes= require("./routes/orders")
const carrito= require("./routes/cart")

app.use('/api',productos) //prefijo inicial en la rutas, sujeto a decision...
app.use('/api',usuarios)
app.use('/api',ordenes)
app.use('/api',carrito)

//MiddleWares para manejar errores
app.use(errorMiddleware)

module.exports=app