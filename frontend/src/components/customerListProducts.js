import React, { useState } from "react";
import Products from '../productos.json';
import "../styles/styleCustomerListProducts.css"

//Formats Numbers
 export const pesoCO = Intl.NumberFormat('es-CO', {
    currency: 'COP', 
    style: 'currency',   
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
 export const percent = new Intl.NumberFormat('es-CO',
    {style:'percent', maximumFractionDigits: 1, signDisplay: "always"});
  
  //Change cart button number
  let quantity=0
  let buttonstate=0;
  
  function numberCart (){
    quantity++;
  
   document.getElementById('numberCart').innerText=quantity;
   document.getElementById('numberCart').className="my-number-cart";
  }
  
  function onoff(element)
  {
    buttonstate= 1 - buttonstate;
    if(buttonstate)  {document.getElementById("my-button-card-cart-0").className="my-button-card-cart-active";}
    else  {document.getElementById("my-button-card-cart-0").className="my-button-card-cart";}
  }

//List of products component
function CustomerListProducts (){

    let [viewProducts, setViewProducts] = useState(Products);
    let discount= Math.random(); //Variable para el descuento por ahora random

    return(
    <section className="w3-container m9 l12 my-container-offers">

      {viewProducts.map((product, index) => {
        return (
          <div className="w3-cell w3-cell-middle" >
            <div className="w3-col ">
            <div className="my-card">
          <div className="w3-row">
            <img className="my-card-image" src={product.urlImagen} alt={product.name}/>
          </div>
          <div className="w3-row my-card-body w3-padding-small">
          <div className="w3-col">
            <p className="my-card-title">{product.name}</p>
            <p className="my-card-category">{product.category}</p>
            </div>
            <div className="w3-row" style={{marginTop: "70px"}}>
            <p className="my-card-r-price">Reg. <span>{pesoCO.format(product.price)}</span> </p>
            <p className="my-card-o-price">{pesoCO.format(product.price-(product.price*discount))}<sup className="my-card-discount">{percent.format(-discount)}</sup></p>
            <p className="my-card-s-price">Ahorro {pesoCO.format(product.price*discount)}</p>
          
            
            <div className="w3-col" style={{width:"50%"}}>
              <p className="my-card-stock">{product.CantStock} en Stock!</p>
            </div>
  
            <div className="w3-col w3-right-align" style={{width:"50%"}}>
              <button id={"my-button-card-cart-"+index} className="my-button-card-cart" onClick={function() {numberCart(); /*onoff(this);*/}}><i className="fi fi-rr-shopping-cart"></i></button>
            </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        )
    })} 
    </section>
    )
  }
  export default CustomerListProducts