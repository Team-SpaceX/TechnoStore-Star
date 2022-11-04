const mongoose=require("mongoose")

//Diseño o modelado de la coleccion "Productos" en la BD
const productoSchema=mongoose.Schema({
    name:{
        type: String,
        required: [true,"Por favor registra el nombre del producto."],
        trim: true,
        maxLength: [120,"El nombre del producto no debe exceder los 120 caracteres."]     
    },
    description:{
        type: String,
        require:[true,"Por favor registre una descripcion para el producto"]
    },
    attribute:[{
        feature:{type:String}
    }],
    category:{
        type:String,
        required:[true,"Por favor selecione la categoria del producto."],
        enum:{
            values:[
                "Laptops & Desktops",
                "Hard Drives, SSD & Storage",
                "Video Graphics Cards",
                "CPUs & Processors",
                "Memory (RAM)",
                "Motherboards",
                "Power Supplies",
                "Fans, Heatsinks & Cooling",
                "Computer Cases"
            ]
        }
    },
    image:[
        {
            url:{
                type:String,
                required:[true,"Por favor asigne una imagen al producto."]
            }
        }
    ],
    price:{
        type: Number,
        required:[true,"Por favor registre el precio del producto."],
        maxLength:[8,"El precio del producto no puede estar por encima de 99'999.999"],
        default:0.0
    },
    discount:{
        type: Number,
        maxLength:[2,"El descuento del producto no puede estar por encima de 99"],
        default:0.0
    },
    Stock:{
        type:Number,
        required:[true,"Por favor registre el stock del producto"],
        maxLength:[5,"Cantidad maxima del producto no puede sobrepasar 99999"],
        default:0
    },
    dateCreate:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Producto",productoSchema)