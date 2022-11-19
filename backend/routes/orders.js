const express= require("express");
const router= express.Router();

const { getAllOrders, newOrder, getOneOrder, updateOrder, deleteOrder, myOrders } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder)//Agregar un pedido
router.route("/order/:id").get(isAuthenticatedUser, getOneOrder)//Ver un pedido por id
router.route("/orders/me").get(isAuthenticatedUser, myOrders)//Ver los pedidos del usuario logueado

//Rutas ADMIN
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)//Lista todos los pedidos
router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder) //Actualizar un pedido por id
router.route("/admin/order/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder) //Eliminar un pedido por id

module.exports=router;