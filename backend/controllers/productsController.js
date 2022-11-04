const product=require("../models/product")

//Listar productos
exports.getProducts=async (req,res,next) =>{
    const products= await product.find();
    //Trae todos los productos de la coleccion y su cantidad
    res.status(200).json({
        success:true,
        count: products.length,
        products
    })
}

//Ver un producto por ID
exports.getProductById= async (req, res, next)=>{
    const productId= await product.findById(req.params.id)
    //Validacion si existe
    if (!productId){
            return res.status(404).json({
            success:false,
            message: 'No existe ese producto en la base de datos'
        })
    }
    //Si el objeto si existe, entonces trae el producto 
    res.status(200).json({
        success:true,
        message:"Aqui debajo encuentras información sobre tu producto: ",
        productId
    })
}

//Crear un nuevo producto
exports.newProduct= async(req,res,next) =>{
    const newProduct= await product.create(req.body);

    res.status(201).json({
        success:true,
        newProduct
    })
}

//Actualizar un producto
exports.updateProduct= async (req,res,next) =>{
    let productUpdate= await product.findById(req.params.id)
    //Validacion si existe
    if (!productUpdate){ 
            return res.status(404).json({
            success:false,
            message: 'No existe ese producto en la base de datos'
        })
    }
    //Si el objeto si existe, entonces si ejecuto la actualización
    productUpdate= await product.findByIdAndUpdate(req.params.id, req.body, {
        new:true, //Valida solo los atributos nuevos o actualizados
        runValidators:true
    });
    //Respuesta si el producto si se actualizó
    res.status(200).json({
        success:true,
        message:"Producto actualizado correctamente",
        productUpdate
    })
}

//Eliminar un producto
exports.deleteProduct= async (req,res,next) =>{
    const productdelete= await product.findById(req.params.id) 
    //Validacion si existe
    if (!productdelete){ 
            return res.status(404).json({
            success:false,
            message: 'No existe ese producto en la base de datos'
        })
    }
    //Si el objeto si existe, entonces se elimina
    await productdelete.remove(); 
    res.status(200).json({
        success:true,
        message:`Producto con id ${req.params.id} eliminado correctamente`
    })
}