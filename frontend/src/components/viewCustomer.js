import React, { useState } from "react";
import ChooseView from "./chooseView";
import Header from "./header";
import Footer from "./footer";
import "../styles/styleViewCustomer.css"
import Products from '../productos.json';

//Formats Numbers
const pesoCO = Intl.NumberFormat('es-CO', {
  currency: 'COP', 
  style: 'currency',   
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const percent = new Intl.NumberFormat('es-CO',
  { style:'percent', maximumFractionDigits: 1, signDisplay: "always"});

export default function ViewCustomer() {

    const goBack = () => {
        setViewCustomer(viewCustomer = <ChooseView />)
    }

    let init =<div id="return viewCustomer2">
            <Header />
            <CustomerListProducts />
            <button className="w3-display-bottomright" onClick={goBack}>Volver</button>
            <Footer />
            </div>;

    let [viewCustomer, setViewCustomer] = useState(init);

    return (viewCustomer)
}

function CustomerListProducts (){
  let [viewProducts, setViewProducts] = useState(Products);
  let discount= Math.random();
  return(<section class="w3-container m9 l12 my-container-offers">
    
    {viewProducts.map(product => {
      return (
        <div className="w3-cell w3-cell-middle" >
          <div class="w3-col ">
          <div class="my-card">
        <div class="w3-row">
          <img class="my-card-image" src={product.urlImagen} alt={product.name}/>
        </div>
        <div className="w3-row my-card-body w3-padding-small">
        <div class="w3-col">
          <p class="my-card-title">{product.name}</p>
          <p class="my-card-category">{product.category}</p>
          </div>
          <div className="w3-row" style={{marginTop: "70px"}}>
          <p class="my-card-r-price">Reg. <span>{pesoCO.format(product.price)}</span> </p>
          <p class="my-card-o-price">{pesoCO.format(product.price-(product.price*discount))}<sup class="my-card-discount">{percent.format(-discount)}</sup></p>
          <p class="my-card-s-price">Ahorro {pesoCO.format(product.price*discount)}</p>
        
          
          <div class="w3-col" style={{width:"50%"}}>
            <p class="my-card-stock">{product.CantStock} en Stock!</p>
          </div>

          <div class="w3-col w3-right-align" style={{width:"50%"}}>
            <button class="my-button-card-cart"><i class="fi fi-rr-shopping-cart"></i></button>
          </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      )
  })} </section>
  )
}
/*
<section class="my-category-offers">
      <h1>Ofertas destacadas</h1>
      <div class="w3-row w3-padding-32">
        <div class="w3-quarter">
          <img src="https://cdn-icons-png.flaticon.com/512/7177/7177465.png" class="w3-round w3-margin-bottom" alt="Categoria 1"
            style={{width:"50px"}} />
          <p>Fuente de poder</p>
        </div>
        <div class="w3-quarter">
          <img src="https://cdn-icons-png.flaticon.com/512/7177/7177444.png" class="w3-round w3-margin-bottom" alt="Categoria 2" style={{width:"50px"}} />
          <p>Refrigeración</p>
        </div>
        <div class="w3-quarter">
          <img src="https://cdn-icons-png.flaticon.com/512/7177/7177412.png" class="w3-round w3-margin-bottom" alt="Categoria 3"
            style={{width:"50px"}} />
          <p>Tarjeta de video</p>
        </div>
        <div class="w3-quarter">
          <img src='https://cdn-icons-png.flaticon.com/512/3176/3176280.png' class="w3-round" alt="Categoria 4" style={{width:"50px"}} />
          <p>Todas las ofertas</p>
        </div>
      </div>
      <div class="line-h"></div>
    </section>

    <section class="w3-container my-container-offers">
      <div class="w3-col my-card">
        <div class="w3-col">
          <img class="my-card-image" src="https://images.evga.com/products/gallery/png/110-BQ-0850-V1_LG_1.png" alt="Producto 1"/>
        </div>

        <div class="w3-col my-card-body w3-padding-small">
          <p class=" my-card-title">Tarjeta de video Nvidia MSI Gaming X GeForce 10 Series GTX 1050 Ti GEFORCE GTX 1050
            TI GAMING X 4G</p>
          <p class="my-card-category">Tarjeta de video</p>
          <p class="my-card-r-price">Reg. $ <span>1.500.000</span> </p>
          <p class="my-card-o-price">$ 1.000.000<sup class="my-card-discount"> -25%</sup></p>
          <p class="my-card-s-price">Ahorro $ 375.000</p>


          <div class="w3-col" style={{width:"50%"}}>
            <p class="my-card-stock">3 en Stock!</p>
          </div>

          <div class="w3-col w3-right-align" style={{width:"50%"}}>
            <button class="my-button-card-cart"><i class="fi fi-rr-shopping-cart"></i></button>
          </div>
        </div>
      </div>
      
      <div class="w3-col my-card">
        <div class="w3-col">
          <img class="my-card-image" src="https://images.evga.com/products/gallery/png/110-BQ-0850-V1_LG_1.png" alt="Producto 2"/>
        </div>

        <div class="w3-col my-card-body w3-padding-small">
          <p class=" my-card-title">Tarjeta de video Nvidia MSI Gaming X GeForce 10 Series GTX 1050 Ti GEFORCE GTX 1050
            TI GAMING X 4G</p>
          <p class="my-card-category">Tarjeta de video</p>
          <p class="my-card-r-price">Reg. $ <span>1.500.000</span> </p>
          <p class="my-card-o-price">$ 1.000.000<sup class="my-card-discount"> -25%</sup></p>
          <p class="my-card-s-price">Ahorro $ 375.000</p>


          <div class="w3-col" style={{width:"50%"}}>
            <p class="my-card-stock">3 en Stock!</p>
          </div>

          <div class="w3-col w3-right-align" style={{width:"50%"}}>
            <button class="my-button-card-cart"><i class="fi fi-rr-shopping-cart"></i></button>
          </div>
        </div>
      </div>
      <div class="w3-col my-card">
        <div class="w3-col">
          <img class="my-card-image" src="https://images.evga.com/products/gallery/png/110-BQ-0850-V1_LG_1.png" alt="Producto 3"/>
        </div>

        <div class="w3-col my-card-body w3-padding-small">
          <p class=" my-card-title">Tarjeta de video Nvidia MSI Gaming X GeForce 10 Series GTX 1050 Ti GEFORCE GTX 1050
            TI GAMING X 4G</p>
          <p class="my-card-category">Tarjeta de video</p>
          <p class="my-card-r-price">Reg. $ <span>1.500.000</span> </p>
          <p class="my-card-o-price">$ 1.000.000<sup class="my-card-discount"> -25%</sup></p>
          <p class="my-card-s-price">Ahorro $ 375.000</p>


          <div class="w3-col" style={{width:"50%"}}>
            <p class="my-card-stock">3 en Stock!</p>
          </div>

          <div class="w3-col w3-right-align" style={{width:"50%"}}>
            <button class="my-button-card-cart"><i class="fi fi-rr-shopping-cart"></i></button>
          </div>
        </div>
      </div>
      <div class="w3-col my-card">
        <div class="w3-col">
          <img class="my-card-image" src="https://images.evga.com/products/gallery/png/110-BQ-0850-V1_LG_1.png" alt="Producto 4"/>
        </div>

        <div class="w3-col my-card-body w3-padding-small">
          <p class=" my-card-title">Tarjeta de video Nvidia MSI Gaming X GeForce 10 Series GTX 1050 Ti GEFORCE GTX 1050
            TI GAMING X 4G</p>
          <p class="my-card-category">Tarjeta de video</p>
          <p class="my-card-r-price">Reg. $ <span>1.500.000</span> </p>
          <p class="my-card-o-price">$ 1.000.000<sup class="my-card-discount"> -25%</sup></p>
          <p class="my-card-s-price">Ahorro $ 375.000</p>


          <div class="w3-col" style={{width:"50%"}}>
            <p class="my-card-stock">3 en Stock!</p>
          </div>

          <div class="w3-col w3-right-align" style={{width:"50%"}}>
            <button class="my-button-card-cart"><i class="fi fi-rr-shopping-cart"></i></button>
          </div>
        </div>
      </div>
    </section>*/