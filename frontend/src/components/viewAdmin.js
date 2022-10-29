import React, { useState } from "react";
import '../styles/styleViewAdmin.css';

import ListProducts from "./listProducts";
import ViewSales from "./viewSales";
//modal
import NewProduct from "./newProduct";

export default function ViewAdmin() {
    
    let init =  <div className="view-admin" style={{flex: 1, margin: "1%"}}>
                    <div className="w3-container">
                        <PanelAdmin />
                    </div>
                </div>;

    let [viewAdmin] = useState(init);
    return (viewAdmin)
}

function PanelAdmin() {

    //changes  the view status to the main panel
    function viewMain() {
        setViewContent(viewContent = "");
    }

    //list of the products on screen
    function listProducts() {
        setViewContent(viewContent = <ListProducts />);
    }
    //list of the sales on screen
    function listSales() {
        setViewContent(viewContent = <ViewSales />);
    }

    let [viewContent, setViewContent] = useState([]);

    return (
        <div className="w3-row">
            <div className='w3-col m3 my-admin-sidebar'>
                <div className="my-admin-sidebar-content">
                    <div className="img-user" onClick={viewMain}>
                        <i className="fi fi-rr-user"></i>
                    </div>
                    <ul>
                        <li onClick={listProducts}>Lista de productos</li>
                        <li onClick={listSales}>Lista de ventas</li>
                    </ul>
                    <hr></hr>
                    <button id="btn-add" onClick={() => { document.getElementById('newProduct').style.display = 'block' }}>Nuevo
                        Producto!</button>
                </div>
            </div>
            {viewContent}
            <NewProduct />

        </div>
    )

}
