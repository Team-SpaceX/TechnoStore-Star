const Order=require("../models/order");
const Product= require("../models/product")
const catchAsyncErrors= require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

//Crear un nuevo pedido
exports.newOrder= catchAsyncErrors (async (req, res, next)=>{
   
    const {
        items,
        shippingInfo,
        priceItems,
        priceTax,
        priceShipping,
        priceTotal,
        payInfo
    } = req.body; 

    const order = await Order.create({
        items,
        shippingInfo,
        priceItems,
        priceTax,
        priceShipping,
        priceTotal,
        payInfo,
        datePay: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success:true,
        order
    })
})

//Ver un pedido, usuario logueado
exports.getOneOrder= catchAsyncErrors( async (req, res, next)=>{
    //populate => Trae algunos campos de los productos referenciados
    const order= await Order.findById(req.params.id).populate("user", "name email")

    if(!order){
        return next(new ErrorHandler("No encontramos una orden con ese Id",404))
    }

    res.status(200).json({
        success:true,
        order
    })
})

//Ver mis pedidos (usuario logueado)
exports.myOrders= catchAsyncErrors( async(req,res, next)=>{
    const orders= await Order.find({user: req.user._id});

    res.status(200).json({
        success:true,
        count: orders.length,
        orders
    })
})

//Servicios controladores sobre pedidos por parte de los ADMIN

//Ver todos los pedidos
exports.getAllOrders= async(req,res,next) =>{
    
    const orders= await Order.find()

    //Calcula el total de ventas
    let total= 0;
    orders.forEach(order =>{
        total += order.priceTotal
    })

    res.status(200).json({
        success:true,
        count: orders.length,
        total,
        orders
    })
}

//Editar un pedido (admin) 
exports.updateOrder= catchAsyncErrors(async(req, res, next)=>{
    const order= await Order.findById(req.params.id)

    if(!order){
        return next (new ErrorHandler("Pedido no encontrada", 404))
    }

    if (order.state==="Enviado" && req.body.state==="Enviado"){
        return next(new ErrorHandler("Esta orden ya fue enviada", 400))
    }

        //Restamos del inventario
        if (req.body.state!=="Procesando"){
            order.items.forEach(async item => {
                await updateStock(item.product, item.quantity)
            })
        }

    order.state = req.body.state;
    order.dateShip = Date.now();

    await order.save()

    res.status(200).json({
        success:true,
        order
    })
})

//Actualiza el stock de los productos
async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock= product.stock-quantity;
    await product.save({validateBeforeSave: false})
}

//Eliminar una pedido
exports.deleteOrder = catchAsyncErrors( async (req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next (new ErrorHandler("Ese pedido no esta registrado", 404))
    }
    await order.remove()

    res.status(200).json({
        success:true,
        message:"Pedido eliminado correctamente"
    })
})