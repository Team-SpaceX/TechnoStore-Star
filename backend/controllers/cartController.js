const User = require("../models/auth");


//Listar productos del carrito
exports.getCart= async (req,res,next) =>{
    const user= await User.findById(req.cookies.idUser).populate({path: "cart.product", select:'_id name category price image discount stock', model: "Producto"});

    let cart= user.cart

    //Trae todos los productos del usuario y su cantidad
    res.status(200).json({
        success:true,
        count: cart.length,
        cart
    })
}

//Agrega un producto al carrito o lo retira si ya estaba
exports.switchCart=  async (req,res,next) =>{
    //Data del usuario logueado
    const user= await User.findById(req.cookies.idUser);
    //Array con solo el carrito
    let cart= user.cart

    //Valida si el producto ya esta en el carrito
    const isAlready = cart.findIndex(item => item.product.toString() === req.body.product)

    if(isAlready > -1){
        console.log("Ya esta registrado ese producto")
        cart.splice(isAlready,1)
    }
    else{
      cart.push(req.body)   
    }

    //Prepara el nuevo arreglo para reinsertar
    let newCart={
        cart: cart
    }

    //Guarda el nuevo array del carrito
    const items = await User.findByIdAndUpdate(req.cookies.idUser, newCart, {
        new: true,
        runValidators:true,
        useFindAndModify: false
    }
    ).populate({path: "cart.product",select:'_id name category price image discount stock',model: "Producto"})

    res.status(200).json({
        success:true,
        items
    })
}