const express=require("express")
const router=express.Router();

const {getProducts, newProduct, getProductById, updateProduct, deleteProduct} = require("../controllers/productsController") //Trae respuesta JSON desde el controlador

//Rutas de accceso por Back
router.route('/productos').get(getProducts) //Listar productos
router.route('/producto/nuevo').post(newProduct) //Agregar producto
router.route('/producto/:id').get(getProductById) //Traer un producto por ID
router.route('/producto/:id').put(updateProduct) // Acutalizar un producto
router.route('/producto/:id').delete(deleteProduct) // Eliminar un producto


module.exports=router;