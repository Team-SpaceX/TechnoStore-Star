import React from "react";

function EditProduct (){

    function enabledInput(x,y,z,w) {
        document.getElementById('my-footer-modal').setAttribute('style', w );
        document.getElementById('btn-edit').style.display = z;
        document.getElementById('btn-vProduct').style.display = y;
        document.getElementById('edit-name').readOnly = x;
        document.getElementById('edit-description').readOnly = x;
        document.getElementById('edit-features').readOnly = x;
        document.getElementById('edit-price').readOnly = x;
        document.getElementById('edit-urlImagen').readOnly = x;
        document.getElementById('edit-category').readOnly = x;
        document.getElementById('edit-cantStock').readOnly = x;
        
        
    }

    return(
        <div id="viewProduct" className="w3-modal">
        <div className="w3-modal-content w3-animate-top w3-card-4">
            <header>
                <h2>Información de Producto</h2>
            </header>
            <div className="w3-container">
                <p>
                    <label>Nombre:</label>
                    <input id="edit-name" className="w3-input" type="text" readOnly></input>
                </p>
                <p>
                    <label>Descripción:</label>
                    <textarea id="edit-description" className="w3-input" rows="4" cols="50" readOnly></textarea>
                </p>
                <p>
                    <label>Características:</label>
                    <textarea id="edit-features" className="w3-input" rows="4" cols="50" readOnly></textarea>
                </p>
                <p>
                    <label>Precio por unidad:</label>
                    <input id="edit-price" className="w3-input" type="number" readOnly></input>
                </p>
                <p>
                    <label>Cantidad en Stock:</label>
                    <input id="edit-cantStock" className="w3-input" type="number" readOnly></input>
                </p>
                <p>
                    <label>Categoría:</label>
                    <input id="edit-category" className="w3-input" type="text" readOnly></input>
                </p>
                <p>
                    <label>URL imagen:</label>
                    <input id="edit-urlImagen" className="w3-input" type="text" readOnly></input>
                </p>
            </div>
            <footer id="my-footer-modal" className="w3-container w3-blue">
            <button id="btn-edit">Guardar!</button>
                <button id="btn-vProduct" onClick={() => {enabledInput(false,"none","inline","background-color: var(--yellow-color) !important;")}}>Editar!</button>
                <button onClick={() => { document.getElementById('viewProduct').style.display = 'none';enabledInput(true,"inline","none") }}>Cancelar</button>
            </footer>
        </div>
    </div>
    )
}

export default EditProduct;