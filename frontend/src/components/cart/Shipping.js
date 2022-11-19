import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from './CheckOutSteps';

export const Shipping = () => {
    let Pais = require('./colombia.json');
    const navigate= useNavigate()
    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [phone, setPhone] = useState(shippingInfo.phone)
    const [department, setDepartment] = useState(shippingInfo.department)
    const [cities, setCities]= useState([])

    useEffect(()=>{
      Pais.forEach((depar)=>{
        if (depar.departamento===department){
            setCities(depar.ciudades)
        }
      })
    })
    const dispatch= useDispatch();

    const submitHandler= (e)=>{
        e.preventDefault()
        dispatch(saveShippingInfo({address, city, phone, department}))
        navigate("/order/confirm")
    }



    return (
        <Fragment>

            <MetaData title={'Información de envio'} />
            <CheckoutSteps shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Información de envio</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Dirección</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Telefono</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Departamento</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required
                            >

                                {Pais.map(dep => (
                                    <option key={dep.departamento} value={dep.departamento}>
                                        {dep.departamento}
                                    </option>
                                ))}

                            </select>


                            <div className="form-group">
                                <label htmlFor="city_field">Ciudad</label>
                                <select
                                    id="city_field"
                                    className="form-control"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                >
                                    {cities.map(ciudad => (
                                        <option key={ciudad} value={ciudad}>
                                            {ciudad}
                                        </option>
                                    ))}
                                   

                                </select>
                            </div>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUAR
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping