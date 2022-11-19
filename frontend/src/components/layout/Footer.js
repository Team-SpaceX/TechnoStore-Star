import React, { Fragment } from 'react'
import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <Fragment>
 
 <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
    
    <p className="col-md-4 mb-0 text-muted">© 2022 SpaceX, Colombia.</p>


    <ul className="nav col-md-4 justify-content-end">
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">FAQs</Link></li>
    </ul>
  </footer>
    </Fragment>
  )
}
