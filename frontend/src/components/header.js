import React, { Fragment } from "react";
import '../styles/styleHeader.css';

const Header = () => {
    return (
      <Fragment>
        <header>
        <nav>
        <div className="w3-bar">
            <div className="w3-bar-item w3-mobile">
            <a href="admin.html" id="logo">
                <img src="./img/Logo-Tecnostore.svg" alt="TechnoStore-Star logo"/>
            </a>
            </div>
            <div id="bar-search">
            <input type="text" className="w3-bar-item w3-input w3-white w3-mobile" placeholder="Buscar productos..." />
            <button className="w3-bar-item w3-button w3-green w3-mobile">
                <i className="fi fi-rr-search"></i>
            </button>
            </div>
            <div className="w3-bar-item w3-right">
            <a href="#" className="w3-bar-item my-button">
                <i className="fi fi-rr-shopping-cart"></i>
                <sup>3</sup>
            </a>
            <div className="w3-dropdown-hover">
                <button className="my-button">
                <i className="fi fi-rr-user"></i>
                </button>
                <div className="w3-dropdown-content w3-bar-block w3-card-4">
                <a href="#" className="w3-bar-item w3-button">Perfil</a>
                <a href="#" className="w3-bar-item w3-button">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Salir
                </a>
                </div>
            </div>
            </div>
        </div>

        <div className="w3-bar my-nav">
            <a href="#" className="w3-bar-item w3-button">&nbsp; &nbsp;</a>
            <a href="admin.html"
            className="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black">Categorías</a>
            <a href="shoppingcart.html"
            className="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black">Ofertas</a>
            <a href="#" className="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black">Ayuda</a>
        </div>

        </nav>
        </header>
</Fragment>
  )
}

export default Header