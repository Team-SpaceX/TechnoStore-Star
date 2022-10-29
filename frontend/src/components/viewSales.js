import React, { useState } from "react";
//data API;
import dbSales from '../ventas.json';
//
import {pesoCO} from "../components/customerListProducts";


function ViewSales(){
    let [viewSales] = useState(dbSales);
    let total = 0;
    dbSales.forEach(element => total +=element.valor);
    return(
        <div className="w3-col m9 my-admin-content">
            <div className="w3-row">
            <h1 id="sectionTitle">Mis Ventas</h1>
            <hr></hr>
            <table className="w3-table-all">
                <tbody>
                    <tr className="w3-indigo">
                        <th>Id Venta</th>
                        <th>Fecha</th>
                        <th>Total Venta</th>
                        <th>Detalle Venta</th>
                        <th>Eliminar</th>
                    </tr>
                    {viewSales.map((elem, idx) => {
                        return (
                        <tr key={elem.idVenta}>
                            <td>{elem.idVenta}</td>
                            <td>{elem.fecha}</td>
                            <td>{pesoCO.format(elem.valor)}</td>
                            <td>
                                <button className="w3-button w3-border w3-round w3-hover-indigo w3-border-blue w3-small">Detalle </button>
                            </td>
                            <td>
                                <button className="w3-button w3-border w3-round w3-hover-red w3-border-blue w3-small">Eliminar</button>
                            </td>
                        </tr>);
                    })}
                </tbody>
            </table>
            </div>
            <div className="w3-row my-totalVentas">
                    <h2>Total de ventas: <span>{ pesoCO.format(total)}</span></h2>
            </div>
        </div>
    )
}

export default ViewSales