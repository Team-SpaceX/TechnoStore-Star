const Order= require("../models/order");

//Crear un nuevo pedido
exports.newOrder= async(req,res,next) =>{
    //Debe traer inputs del Front, para llena estas constantes
    const {
        items,
        shippingInfo,
        priceItems,
        priceTax,
        priceShipping,
        priceTotal,
        user //Cambia con autenticación, por ahora asi queda..
    } = req.body; 

    const order = await Order.create({
        items,
        shippingInfo,
        priceItems,
        priceTax,
        priceShipping,
        priceTotal,
        user //Cambia con autenticación, por ahora asi queda..
    })

    res.status(201).json({
        success:true,
        order
    })
}

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
        total,
        orders
    })
}