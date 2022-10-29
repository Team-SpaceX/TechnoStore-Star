import React from "react";

function NewProduct (){
    return(

        <div id="newProduct" className="w3-modal">
        <div className="w3-modal-content w3-animate-top w3-card-4">
            <header>
                <h2>Producto Nuevo</h2>
            </header>
            <div className="w3-container">
                <p>
                    <label>Nombre:</label>
                    <input className="w3-input" type="text"></input>
                </p>
                <p>
                    <label>Descripción:</label>
                    <textarea className="w3-input" rows="4" cols="50"></textarea>
                </p>
                <p>
                    <label>Características:</label>
                    <textarea className="w3-input" rows="4" cols="50"></textarea>
                </p>
                <p>
                    <label>Precio por unidad:</label>
                    <input className="w3-input" type="number"></input>
                </p>
                <p>
                    <label>Cantidad en Stock:</label>
                    <input className="w3-input" type="number"></input>
                </p>
                <p>
                    <label>Categoría:</label>
                    <input className="w3-input" type="text"></input>
                </p>
                <p>
                    <label>URL imagen:</label>
                    <input className="w3-input" type="text"></input>
                </p>
            </div>
            <footer className="w3-container w3-green">

                <button>Guardar!</button>
                <button onClick={() => { document.getElementById('newProduct').style.display = 'none' }}>Cancelar</button>
            </footer>
        </div>
    </div>
    )
}

export default NewProduct;