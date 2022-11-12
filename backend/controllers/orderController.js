const { model } = require("mongoose");
const Order= require("../models/order");
const User= require("../models/auth");
const Product= require("../models/product");

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
    //populate => Trae algunos campos de los productos referenciados
    const orders= await Order.find().populate({path: "items.product",select:'_id name category price image discount stock',model: "Producto"})
    .populate({path: "user",select:'_id name email', model: "Usuario"});
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
    
//Funcion para actualizar el stock de un producto
    async function updateStock(id, quantity){
    
    const product = await Product.findById(id);
    
    product.stock= product.stock-quantity;
    
    //Verifica si hay stock disponible antes de actualizar
    if (product.stock<0) {
        return 'NO hay suficientes existencias'
    }
    else{
        await product.save({validateBeforeSave:false})
        return `Stock actualizado del producto id ${id}, existencias restantes ${product.stock}`
    }
    }

//Funcion para vaciar el carrito
async function clearCart(id){
    let newCart={
        cart: []
    }
    
    const clearCart = await User.findByIdAndUpdate(id, newCart, {
        new: true,
        runValidators:true,
        useFindAndModify: false
    })

    return "Ahora el carrito esta Vacio!"
}

//Crear un nuevo pedido desde el carrito!
exports.newOrderByCart= async(req,res,next) => {
    
    //Data del usuario logueado
    const data= await User.findById(req.cookies.idUser).populate({path: "cart.product", select:'_id name category price image discount stock', model: "Producto"});
    
    //Inicio de variables
    const items= data.cart
    const shippingInfo = req.body; 
    const user = req.cookies.idUser
    let [priceItems, priceTax, priceShipping, priceTotal] = [0,0,0,0]

    //Calculo de los precios
    items.forEach(item =>{
        priceItems += item.product.price*item.quantity;
        priceTax += (item.product.price*item.quantity)* 0.19;
        priceShipping += 2000;
    })
    priceShipping+=5000; //Tarifa estandar?...
    priceTotal+= priceItems+priceTax+priceShipping;

    //Crea el nnuevo pedido
    const order = await Order.create({
        items,
        shippingInfo,
        priceItems,
        priceTax,
        priceShipping,
        priceTotal,
        user 
    })

    //Actualiza el stock de los productos
    items.forEach(item => {
        updateStock(item.product._id.toString(),item.quantity).then(result =>{console.log(result)})
    });

    //Vacia el carrito
    clearCart(req.cookies.idUser).then(result =>{console.log(result)});

    res.status(201).json({
        success:true,
        message: '¡Compra exitosa!',
        order
    })
}