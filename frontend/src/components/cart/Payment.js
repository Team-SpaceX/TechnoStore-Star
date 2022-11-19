import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import uuid from "react-native-uuid"
import { clearErrors, createOrder } from '../../actions/orderActions';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import CheckoutSteps from './CheckOutSteps';

export const Payment = () => {
    const navigate= useNavigate();
    const alert= useAlert();
    const dispatch= useDispatch();
    const id= uuid.v4()
    const {cartItems, shippingInfo} = useSelector(state => state.cart)
    const {error} = useSelector(state => state.newOrder)

    useEffect(()=>{
        if (error){
            alert.error(error)
            dispatch(clearErrors)
        }
    },[dispatch, alert, error])

    let items=[];

    cartItems.forEach(elem =>{
        items.push({
            name: elem.name,
            quantity: elem.quantity,
            image: elem.image,
            price: elem.price,
            product: elem.product
        })
    })

    const order={
        items,
        shippingInfo: shippingInfo
    }

    const orderInfo= JSON.parse(sessionStorage.getItem("orderInfo"));

    if (orderInfo){
        order.priceItems= orderInfo.priceItems
        order.priceShipping=orderInfo.priceShipping
        order.priceTax= orderInfo.priceTax
        order.priceTotal= orderInfo.priceTotal
        order.payInfo={
            id:id,
            state:"Aceptado"
        }
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        try{
            dispatch(createOrder(order))
            localStorage.removeItem("cartItems")
            window.alert("Orden registrada correctamente")
            navigate("/success")
            window.location.reload(false)
        }catch(error){
            window.alert("no se logró registrar la compra")
        }
    }

  return (
    <Fragment>
            <MetaData title={'Pago'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} >
                        <h1 className="mb-4">Datos de tarjeta</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Datos de la tarjeta</label>
                            <input
                                type="number"
                                id="card_num_field"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Fecha de vencimiento</label>
                            <input
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">CVC</label>
                            <input
                                type="number"
                                id="card_cvc_field"
                                className="form-control"
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pagar ${` - ${orderInfo && orderInfo.priceTotal}`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>

  )
}
