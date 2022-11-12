const express=require("express")
const router=express.Router();

const {getProducts, newProduct, getProductById, getProductByCategory, updateProduct, deleteProduct, getProductsInStock} = require("../controllers/productsController") //Trae respuesta JSON desde el controlador

//Rutas de accceso por Back(administrador)
router.route('/productos').get(getProducts) //Listar productos
router.route('/producto/nuevo').post(newProduct) //Agregar producto
router.route('/producto/:id').get(getProductById) //Traer un producto por ID
router.route('/producto-categoria/:category').get(getProductByCategory) //Traer un producto por Categoria
router.route('/producto/:id').put(updateProduct) // Acutalizar un producto
router.route('/producto/:id').delete(deleteProduct) // Eliminar un producto

//Rutas para clientes
router.route('/productosInStock').get(getProductsInStock) //Listar productos con stock > 0


module.exports=router;