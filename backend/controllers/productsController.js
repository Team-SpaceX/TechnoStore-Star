const Product=require("../models/product")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary=require("cloudinary")

//Listar productos all users
exports.getProducts= catchAsyncErrors(async (req,res,next) =>{
    const resPerPage = 4;
    const productsCount = await Product.countDocuments();
    
    //Trae todos los productos de la coleccion y segun el filtro
    const apiFeatures = new APIFeatures(Product.find({ stock: { $gt: 0 } }), req.query)
        .search()
        .filter();

    //Configura los productos mostrados por pagina
    let products = await apiFeatures.query;
    let filteredProductsCount= products.length;
    apiFeatures.pagination(resPerPage);
    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })
})

//Ver un producto por ID
exports.getProductById= catchAsyncErrors(async (req, res, next) => {
    const product= await Product.findById(req.params.id)
    
    //Validacion si existe
    if (!product){
        return next(new ErrorHandler("Producto no encontrado", 404))
    }
    //Si el objeto si existe, entonces trae el producto 
    res.status(200).json({
        success:true,
        message:"Aqui debajo encuentras información sobre tu producto: ",
        product
    })
})

//Ver un producto por CATEGORIA
exports.getProductByCategory= catchAsyncErrors(async (req, res, next)=>{
    const productCategory= await Product.find({category: req.params.category})
    //Validacion si existe
    if (!productCategory){
        return next(new ErrorHandler("No existen productos con esta categoria en la base de datos", 404))
    }
    //Si el objeto si existe, entonces trae el producto 
    res.status(200).json({
        success:true,
        message:"Aqui debajo encuentras información sobre tus producto: ",
        count: productCategory.length,
        productCategory
    })
})

/*=====================
RUTAS PARA LOS ADMIN
=====================*/

//Crear un nuevo producto
exports.newProduct= catchAsyncErrors( async (req,res,next) =>{
    //Verifica si vienen imagenes en el body
    let imagen=[]
    if(typeof req.body.image === "string"){
        imagen.push(req.body.image)
    }else{
        imagen= req.body.image
    }

    //Guarda las imagenes con Cloudinary
    let imagenLink=[]

    for (let i=0; i<imagen.length;i++){
        const result = await cloudinary.v2.uploader.upload(imagen[i],{
            folder:"products"
        })
        imagenLink.push({
            public_id:result.public_id,
            url: result.secure_url
        })
    }

    //Setea los links de las imgenes
    req.body.image= imagenLink;
    req.body.user = req.user.id;

    const newProduct= await Product.create(req.body);

    res.status(201).json({
        success:true,
        newProduct
    })
})

//Actualizar un producto
exports.updateProduct=  catchAsyncErrors(async (req,res,next) =>{
    let productUpdate= await Product.findById(req.params.id)
    //Validacion si existe el producto en la DB
    if (!productUpdate){ 
        return next(new ErrorHandler("Producto no encontrado", 404))
    }

    //Actualizacion de las imagenes
    let image=[]

    if (typeof req.body.image==="string"){
        image.push(req.body.image)
    }else{
        image=req.body.image
    }

    if (image!== undefined){
        //Eliminar las imagenes viejas asociadas al producto
        for (let i=0; i<productUpdate.image.length; i++){
            const result= await cloudinary.v2.uploader.destroy(productUpdate.image[i].public_id)
        }
        //Guarda las nuevas imagenes con Cloudinary
        let imageLinks=[]
        for (let i=0; i<image.length; i++){
            const result=await cloudinary.v2.uploader.upload(image[i],{
                folder:"products"
            });
            imageLinks.push({
                public_id:result.public_id,
                url: result.secure_url
            })
        }
        req.body.image=imageLinks
    }

    //Si el objeto si existe, entonces si ejecuto la actualización
    productUpdate= await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true, //Valida solo los atributos nuevos o actualizados
        runValidators:true
    });

    //Respuesta si el producto si se actualizó
    res.status(200).json({
        success:true,
        message:"Producto actualizado correctamente",
        productUpdate
    })
})

//Eliminar un producto
exports.deleteProduct= catchAsyncErrors(async (req,res,next) =>{
    const productDelete= await Product.findById(req.params.id) 
    //Validacion si existe
    if (!productDelete){ 
        return next(new ErrorHandler("Producto no encontrado", 404))
    }
    //Si el objeto si existe, entonces se elimina
    await productDelete.remove(); 
    res.status(200).json({
        success:true,
        message:`Producto con id ${req.params.id} eliminado correctamente`
    })
})

//Ver toda la lista de productos
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find()

    res.status(200).json({
        count: products.length,
        products
    })

})

/*=====================
RUTAS PARA LOS CLIENTES
=====================*/

//Crear o actualizar una review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, idProduct } = req.body;

    const review = {
        nameUser: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(idProduct);

    const isReviewed = product.reviews.find(item =>
        item.nameUser === req.user.name)

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.nameUser === req.user.name) {
                review.comment = comment,
                    review.rating = rating
            }
        })
    } else {
        product.reviews.push(review)
        product.numGrades = product.reviews.length
    }

    product.grade = product.reviews.reduce((acc, review) =>
        review.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Has opinado correctamente"
    })

})

//Ver todas las review de un producto
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Eliminar review del usuario
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.idProduct);

    const opi = product.reviews.filter(review =>
        review._id.toString() !== req.query.idReview.toString());

    const numGrades = opi.length;

    const grade = opi.reduce((acc, review) =>
        review.rating + acc, 0) / opi.length;
        console.log(opi)
    await Product.findByIdAndUpdate(req.query.idProduct, {
        reviews: opi,
        grade,
        numGrades
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Review eliminada correctamente"
    })

})