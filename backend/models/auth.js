const mongoose = require("mongoose")

const usuarioSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        default:'user'
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Usuario", usuarioSchema)