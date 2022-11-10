const express= require("express");
const router= express.Router();

const { getAllOrders, getAllOrders2, newOrder } = require("../controllers/orderController");

router.route("/pedidos").get(getAllOrders)
router.route("/pedido/nuevo").post(newOrder)


module.exports=router;