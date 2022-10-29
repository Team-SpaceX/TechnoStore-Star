import React, { useState } from "react";
import "../styles/styleCustomerCart.css"
import Products from '../productos.json';
import {pesoCO, percent} from "../components/customerListProducts";

function CustomerCart () {

let items= Products.slice(0,5);    
let [viewCart, setViewCart] = useState(items);

let total=0;
let envio=10000;
viewCart.map((item, index) => {return (total+=item.price)})

  return (
    <main class='w3-row cart-body'>

    <div class='w3-col m8 l9'>
      <div class='cart-content w3-padding-small'>
        <h1 class="cart-title" style={{textAlign: "left !important"}}>Carrito de compras</h1>
         <hr style={{border: 0, margin: "10px 0"}}/>

        {/* Items */}
        {viewCart.map((item, index) => {
        return (
        <div class="w3-cell-row cart-content-item">
          <div class="w3-cell  w3-cell-middle" style={{width:"200px"}}>
            <img class="cart-item-image" src={item.urlImagen} alt={item.name}/>
          </div>
          <div class="w3-cell  w3-cell-middle w3-padding-small">
            <p class="cart-item-name">{item.name}</p>
            <p> Precio und. <span class="cart-item-price">{pesoCO.format(item.price)}<sup class="my-card-discount">{percent.format(-Math.random()/2)}</sup></span>
            </p>
          </div>
          <div class="w3-cell  w3-cell-middle" style={{textAlign: "center", width:"200px"}}>
            <p> Cantidad </p>
            <div class="w3-border w3-round-xlarge" style={{width: "80px", display: "inline-block"}}>
              <input id="inputCant" type="number" class="cart-qty-input" min={1} defaultValue={1}></input>
            </div>
            <hr style={{border: 0, margin: "10px 0"}}/>
            <div style={{textAlign: "right !important"}}>
              <button class="w3-button cart-item-delete"><i class="fi fi-rr-trash"></i></button>
            </div>
          </div>
        </div>
        )
    })} 
      </div>
    </div>
    
    {/* Resume Content */}
    <div class='w3-col m4 l3'>
      <div class="w3-margin cart-content w3-padding-small">
        <h1 class="cart-title">Resumen</h1>
        <hr style={{border: 0, margin: "10px 0", padding: "8px 16px",borderBottom: "1px dashed  #ddd"}}/>
        <ul class="w3-ul" style={{textAlign: "left"}}>
          <li>
            <div>
              <span>Subtotal (<label>{items.length}</label>):
              </span>
              <label className="w3-right"> {pesoCO.format(total)}</label>
            </div>
          </li>
          <li>
            <div>
              <span>Envío
              </span>
              <label className="w3-right">{pesoCO.format(envio)}</label>
            </div>
          </li>
          <li>
            <div>
              <span>Total a pagar:
              </span>
              <label className="w3-right">{pesoCO.format(total+envio)}</label>
            </div>
          </li>
          <li class="w3-center">
            <div class="w3-cell-row w3-padding-small" style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
              <div class="w3-cell w3-mobile" style={{ padding : "10px" }}>
                <button class="w3-button cart-button-checkout">Procesar compra</button>
              </div>
              <div class="w3-cell w3-mobile" style={{ padding : "10px" }}>
                <button class="w3-button cart-button-cancel">Cancelar</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
  )
}
export default CustomerCart