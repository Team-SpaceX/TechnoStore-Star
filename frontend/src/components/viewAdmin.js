import React, { useState } from "react";
import '../styles/styleViewAdmin.css';
import ChooseView from "./chooseView";
import Footer from "./footer";
import dbProducts from '../productos.json';
//nav-bar
import NavAdmin from "./navAdmin";

export default function ViewAdmin() {
    const goBack = () => {
        setViewAdmin(viewAdmin = <ChooseView />)
    }

    //initial status of the view to manage products
    let init = <div className="view-admin">
                    <NavAdmin />
                    <div className="w3-container">
                        <PanelAdmin />

                        <button className="w3-display-bottomright" onClick={goBack}>Volver</button>
                    </div>
                    <Footer />
                </div>;

    let [viewAdmin, setViewAdmin] = useState(init);
    return (
        <div>
            {viewAdmin}
        </div>
    )
}

function PanelAdmin() {
    //changes  the view status to the main panel
    function viewMain(){
        document.getElementById('sectionTitle').innerText = 'Panel Principal';
        setViewProducts(viewProducts = [])
    }
    //list of the products on screen
    function listProducts() {
        document.getElementById('sectionTitle').innerText = 'Mis Productos';
        setViewProducts(viewProducts = dbProducts);

    }
    let [viewProducts, setViewProducts] = useState([]);
    return (
        <div className="w3-row">
            <div className='w3-col m3 my-admin-sidebar'>
                <div className="my-admin-sidebar-content">
                    <div className="img-user" onClick={viewMain}>
                        <i className="fi fi-rr-user"></i>
                    </div>
                    <ul>
                        <li onClick={listProducts}>Lista de productos</li>
                        <li>Lista de ventas</li>
                    </ul>
                    <hr></hr>
                    <button id="btn-add">Nuevo
                        Producto!</button>
                </div>
            </div>
            <div className="w3-col m9 my-admin-content">
            <h1 id="sectionTitle">Panel principal</h1>
                    <hr></hr>
                    {viewProducts.map((elem, idx) => {
                        return (
                            <div className="w3-col my-admin-card" key={elem.id}>

                                <div className="my-admin-card-img">
                                    <img src={elem.urlImagen} alt='Imagen del producto'></img>
                                </div>
                                <div className='my-admin-card-b'>
                                    <h3>{elem.name}</h3>
                                    <h4>Precio: <span>$ {elem.price}</span></h4>
                                    <h5>{elem.CantStock} en Stock!</h5>
                                </div>
                                <div className='my-admin-card-a'>
                                    <button id="btn-view"><i
                                        className="fi fi-rr-eye"></i></button>
                                    <button id="btn-delete"><i className="fi fi-rr-trash"></i></button>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
            )
}