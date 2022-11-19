const express=require("express")
const router=express.Router();

const {getProducts, newProduct, getProductById, getProductByCategory, updateProduct, deleteProduct, getAdminProducts, createProductReview, getProductReviews, deleteReview} = require("../controllers/productsController") //Trae respuesta JSON desde el controlador
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");

//Rutas para todos
router.route('/products').get(getProducts) //Listar productos
router.route('/product/:id').get(getProductById) //Traer un producto por ID
router.route('/productsCategory/:category').get(getProductByCategory) //Traer un producto por Categoria

//Rutas ADMIN
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts) //Listar productos
router.route('/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct) //Agregar producto
router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct) // Actualizar un producto
router.route('/product/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct) // Eliminar un producto

//Rutas para usuarios
router.route("/review").put(isAuthenticatedUser, createProductReview)// Agregar review a un producto
router.route("/reviews").get(isAuthenticatedUser, getProductReviews)//Ver las reviews de un producto
router.route("/review").delete(isAuthenticatedUser, deleteReview)//Eliminar la review del usuario

module.exports=router;