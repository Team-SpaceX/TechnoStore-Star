import React, { useState } from "react";
import '../styles/styleChooseView.css';
import ViewAdmin from "./viewAdmin";
import ViewCustomer from "./viewCustomer";
import { Link } from 'react-router-dom'


export default function ChooseView() {
    let init = 
    <div className="choose-view">
    <div className="w3-container">
    <div className="w3-card">
        <h1>Escoger Vista</h1>
        <div className="w3-row"><Link to='/user/products' className="w3-button w3-black w3-round-xxlarge btn" >Cliente</Link></div>
        <div className="w3-row"><button className="w3-button w3-black w3-round-xxlarge btn" onClick={viewAdmin}>Adminstrador</button></div>
    </div>
</div>
</div>;

let [chooseView, setChooseView] = useState(init)

function viewAdmin() {
    setChooseView(chooseView = <ViewAdmin />)
}

function viewCustomer() {
    setChooseView(chooseView = <ViewCustomer />)
}
    return (chooseView)
}