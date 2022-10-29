import React from "react";

function DelProduct (){
    return(
        <div id="delProduct" className="w3-modal">
        <div className="w3-modal-content w3-animate-top w3-card-4">
            <div className="w3-container" id="modalMessage">
            </div>
            <footer className="w3-container w3-red">
                <button>Eliminar!</button>
                <button onClick={() => { document.getElementById('delProduct').style.display = 'none' }}>Cancelar</button>
            </footer>
        </div>;
    </div>
    )
}

export default DelProduct