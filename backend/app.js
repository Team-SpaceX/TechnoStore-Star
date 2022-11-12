const express=require("express");
const app = express();
const cookieParser= require("cookie-parser")

//Uso de constantes importadas
app.use(express.json());
app.use(cookieParser());

//Importar rutas
const productos=require("./routes/products")
const usuarios=require("./routes/auth")
const ordenes= require("./routes/orders")
const carrito= require("./routes/cart")

app.use('/api',productos) //prefijo inicial en la rutas, sujeto a decision...
app.use('/api',usuarios)
app.use('/api',ordenes)
app.use('/api',carrito)

module.exports=app