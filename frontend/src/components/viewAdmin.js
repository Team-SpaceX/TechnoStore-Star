import React, { useState } from "react";
import '../styles/styleViewAdmin.css';
import ChooseView from "./chooseView";
import datosProductos from '../productos.json';
import Footer from "./footer";

export default function ViewAdmin() {

    const goBack = () => {
        setViweAdmin(viewAdmin = <ChooseView />)
    }



    let init = <div className="view-admin">
        <div className="w3-bar">
            <div className="w3-mobile">
                <img id="logo" src="./img/Logo-Tecnostore.svg" alt="logo de la app"></img>
            </div>
        </div>

        <div className="w3-container">
            <PanelAdmin />

            <button className="w3-display-bottomright" onClick={goBack}>Volver</button>
        </div>
    </div>;

    //let [chooseView, setChooseView] = useState('')
    let [viewAdmin, setViweAdmin] = useState(init);

    return (
        <div>
            {viewAdmin}
        </div>

    )
}

function PanelAdmin() {
    function visualizacion() {

        setvisualizar(visualizar = datosProductos)

    }

    let [visualizar, setvisualizar] = useState([])
    return (

        <div className="w3-row">
            <div className='w3-col m3 my-admin-sidebar'>
                <div className="my-admin-sidebar-content">
                    <div className="img-user">
                        <i className="fi fi-rr-user"></i>
                    </div>
                    <ul>
                        <li onClick={visualizacion}>Lista de productos</li>
                        <li>Lista de ventas</li>
                    </ul>
                    <hr></hr>
                    <button id="btn-add">Nuevo
                        Producto!</button>
                </div>
            </div>
            <div className="w3-col m9 my-admin-content">
                    <h1>Lista de productos</h1>
                    <hr></hr>
                    {visualizar.map((elem, idx) => {
                        return (
                            <div className="w3-col my-admin-card" key={elem.id}>

                                <div className="my-admin-card-img">
                                    <img src={elem.urlImagen}></img>
                                </div>
                                <div className='my-admin-card-b'>
                                    <h3>{elem.nombre}</h3>
                                    <h4>Precio: <span>$ {elem.precioUnidad}</span></h4>
                                    <h5>{elem.stock} en Stock!</h5>
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