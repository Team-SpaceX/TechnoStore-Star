import React, { useState } from "react";
//data API
import dbProducts from '../productos.json';

//modal
import DelProduct from "./delProduct";
import EditProduct from "./editProduct";


function ListProducts(){
    //functionality of the delete button
    function btnDelProduct(data) {
        document.getElementById('delProduct').style.display = 'block';
        document.getElementById('modalMessage').innerHTML = "<p>¿Está seguro de eliminar el producto " + data.name + " ?</p>";
    }

    //functionality of the edit button
    function btnEditProduct(data) {
        document.getElementById('viewProduct').style.display = 'block';
        document.getElementById('edit-name').value=data.name;
        document.getElementById('edit-description').value=data.description;
        document.getElementById('edit-features').value=data.features;
        document.getElementById('edit-price').value=data.price;
        document.getElementById('edit-urlImagen').value=data.urlImagen;
        document.getElementById('edit-category').value=data.category;
        document.getElementById('edit-cantStock').value=data.CantStock;
        
        
    }
    let [viewProducts] = useState(dbProducts);
    return(
        <div className="w3-col m9 my-admin-content">
        <h1 id="sectionTitle">Mis Productos</h1>
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
                                <button id="btn-view" onClick={() => {btnEditProduct(elem)}}>
                                    <i className="fi fi-rr-eye"></i>
                                    </button>
                                <button id="btn-delete" onClick={() => {btnDelProduct(elem)}}><i className="fi fi-rr-trash"></i></button>
                            </div>
                        </div>
                    )
                })}

<DelProduct />
<EditProduct />
        </div>
    )
}

export default ListProducts;