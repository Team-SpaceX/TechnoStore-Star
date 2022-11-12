const mongoose=require("mongoose");

//Conexion a la DB
const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(con => {
        console.log(`Base de datos ${con.connection.name} (MongoDB) conectada con el servidor: ${con.connection.host}`)
    })
    .catch(con => {
        console.log(`No se logro la conexion con la base de datos`);
        console.log(error.message)
    })
}

module.exports=connectDatabase;