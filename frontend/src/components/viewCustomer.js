import React, { useState } from "react";
import ChooseView from "./chooseView";
import Header from "./header";
import Footer from "./footer";

export default function ViewCustomer() {

    const goBack = () => {
        setViewCustomer(viewCustomer = <ChooseView />)
    }

    let init =<div>
            <Header />
            <h1>Hola Mundo!</h1>
            <button className="w3-display-bottomright" onClick={goBack}>Volver</button>
            <Footer />
            </div>;


    let [viewCustomer, setViewCustomer] = useState(init);

    return (
        <div>
            {viewCustomer}
        </div>

    )
}