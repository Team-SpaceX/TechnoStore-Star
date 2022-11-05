const express=require("express");
const app = express();

//Uso de constantes importadas
app.use(express.json());

//Importar rutas
const productos=require("./routes/products")
const usuarios=require("./routes/auth")
const ordenes= require("./routes/orders")

app.use('/api',productos) //prefijo inicial en la rutas, sujeto a decision...
app.use('/api',usuarios)
app.use('/api',ordenes)

module.exports=app