import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import CustomerListProducts from "./customerListProducts";
import CustomerCart from "./customerCart";


//View component
export default function ViewCustomer() {

    const goCart = () => {
      setViewCustomer(viewCustomer = <CustomerCart/>)
    }

    let init =<div id="return viewCustomer2">
            <Header />
            <PanelCustomer />
            <button className="w3-display-bottomright" onClick={goCart}>GoCArt!</button>
            <Footer />
            </div>;

    let [viewCustomer, setViewCustomer] = useState(init);

    return (viewCustomer)
}

function PanelCustomer (){
  return <CustomerListProducts />
}



