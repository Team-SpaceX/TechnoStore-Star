import React, { Fragment } from 'react'
import '../styles/styleFooter.css'

const Footer = () => {
  return (
    <Fragment>
    <footer>
        <div className="w3-row">
        <div className="w3-half">
            <i className="fi fi-rr-store-alt"></i>
            <p>Acerca de Nosotros</p>
        </div>
        <div className="w3-half">
            <i className="fi fi-rr-interrogation"></i>
            <p>Ayuda/PQR</p>
        </div>
        </div>
        Copyright © 2022 SpaceX Colombia.
    </footer>
    </Fragment>
  )
}
export default Footer