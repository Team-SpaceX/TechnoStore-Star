const express=require("express")
const router=express.Router();

const {getProducts, newProduct, getProductById, getProductByCategory, updateProduct, deleteProduct, getProductsInStock, getAdminProducts, createProductReview, getProductReviews, deleteReview} = require("../controllers/productsController") //Trae respuesta JSON desde el controlador
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");

//Rutas para todos
router.route('/products').get(getProducts) //Listar productos
router.route('/product/:id').get(getProductById) //Traer un producto por ID
router.route('/productsCategory/:category').get(getProductByCategory) //Traer un producto por Categoria

//Rutas ADMIN
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts) //Listar productos
router.route('/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), newProduct) //Agregar producto
router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct) // Acutalizar un producto
router.route('/product/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct) // Eliminar un producto

//Rutas para clientes
router.route('/productosInStock').get(getProductsInStock) //Listar productos con stock > 0
router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(isAuthenticatedUser, getProductReviews)
router.route("/review").delete(isAuthenticatedUser, deleteReview)

module.exports=router;