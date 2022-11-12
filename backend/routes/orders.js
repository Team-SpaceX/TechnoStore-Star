const express= require("express");
const router= express.Router();

const { getAllOrders, newOrder, newOrderByCart } = require("../controllers/orderController");

router.route("/pedidos").get(getAllOrders)//Lista todos los pedidos
router.route("/pedido/nuevo").post(newOrder)//Agregar un pedido con JSON
router.route("/pedido/cart").post(newOrderByCart)//Agregar un pedido con el carrito


module.exports=router;