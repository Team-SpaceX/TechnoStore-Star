const express=require("express");
const router=express.Router();

const { getCart, switchCart } = require("../controllers/cartController");

router.route('/cart').get(getCart) //Lista los productos dentro del carrito
router.route('/addCart').put(switchCart) //Añade un prodcuto al carrito

module.exports=router;