import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import '../styles/styleHeader.css';

const Header = () => {
    return (
      <Fragment>
        <header>
        <nav>
        <div className="w3-cell-row">
            <div className="w3-cell w3-cell-middle w3-mobile" style={{width:"20%"}}>
            <Link to='/' id="logo">
                <img src="./img/Logo-Tecnostore.svg" alt="TechnoStore-Star logo"/>
            </Link>
            </div>
            <div className="w3-cell w3-cell-middle w3-mobile" style={{width:"60%", paddingBottom: "10px", paddingTop: "10px"}}>
            <div id="bar-search" className="w3-bar">
            <input type="text" className="w3-bar-item w3-input w3-white w3-mobile" placeholder="Buscar productos..." />
            <button className="w3-bar-item w3-button w3-mobile">
                <i className="fi fi-rr-search"></i>
            </button>
            </div>
            </div>
            <div className="w3-cell w3-cell-middle w3-mobile" style={{width:"20%", paddingRight:"10vh"}}>
            <div className="w3-bar-item w3-right">
            <Link to='/user/cart' className="w3-bar-item my-button">
                <i className="fi fi-rr-shopping-cart"></i>
                <sup id="numberCart"></sup>
            </Link>
            <div className="w3-dropdown-hover" style={{float: "right"}}>
                <button className="my-button">
                <i className="fi fi-rr-user"></i>
                </button>
                <div className="w3-dropdown-content w3-bar-block w3-card-4" style={{right: 0}}>
                <Link to="/admin/" className="w3-bar-item w3-button">Perfil</Link>
                <a href="#" className="w3-bar-item w3-button">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Salir
                </a>
                </div>
            </div>
            </div>
            </div>
        </div>

        <div className="w3-bar my-nav w3-center">
            <a href="#"
            className="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black">Categorías</a>
            <a href="#"
            className="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black">Ofertas</a>
            <a href="#" className="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black">Ayuda</a>
        </div>

        </nav>
        </header>
</Fragment>
  )
}

export default Header