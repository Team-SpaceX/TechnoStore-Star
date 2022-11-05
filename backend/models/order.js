const mongoose = require("mongoose")

const orderSchema= mongoose.Schema({
    shippingInfo:{
        address:{
            type: String,
            required:true
        },
        city:{
            type: String,
            required:true
        },
        phone:{
            type: String,
            required:true 
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Usuario"
    },
    items:[{
        name:{
            type: String,
            required:true
        },
        image:{
            type: String,
            required:true
        },
        price:{
            type: Number,
            required:true
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Producto"
        },
        quantity:{
            type: Number,
            required:true
        }
    }],
    priceItems:{
        type:Number,
        required:true,
        default:0.0
    },
    priceTax:{
        type:Number,
        required:true,
        default: 0.0
    },
    priceShipping:{
        type:Number,
        required:true,
        default: 0.0
    },
    priceTotal:{
        type:Number,
        required:true,
        default: 0.0
    },
    state:{
        type:String,
        required:true,
        default:"Procesando"
    },
    dateCreate:{
        type:Date,
        default:Date.now
    }

})

module.exports= mongoose.model("Pedido", orderSchema)