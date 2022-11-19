import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { clearErrors, getOrderDetails } from '../../actions/orderActions';
import MetaData from '../layout/MetaData'

export const OrderDetails = () => {
    const navigate=useNavigate();
    const params= useParams();
    const alert= useAlert();
    const dispatch= useDispatch();
    const {loading, error, order={}}= useSelector(state=> state.orderDetails)
    const { shippingInfo, items, payInfo, user, priceTotal, state} = order

    useEffect(()=>{
        dispatch(getOrderDetails(params.id));
        if (error){
            alert.error(error)
            dispatch(clearErrors)
        }
    },[dispatch, alert, error, params.id])
    const detailsShip= shippingInfo && `${shippingInfo.direccion}, ${shippingInfo.ciudad}, ${shippingInfo.departament}`

    const isPaid= payInfo && payInfo.state==="Aceptado" ? true : false

  return (
    <Fragment>
            <MetaData title={'Detalle del Pedido'} />

            {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                <Fragment>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Pedido # {order._id}</h1>

                            <h4 className="mb-4">Datos de envio</h4>
                            <p><b>Nombre:</b> {user && user.name}</p>
                            <p><b>Telefono:</b> {shippingInfo && shippingInfo.phone}</p>
                            <p className="mb-4"><b>Dirección:</b>{detailsShip}</p>
                            <p><b>Pago Total:</b> ${priceTotal}</p>

                            <hr />

                            <h4 className="my-4">Pago</h4>
                            <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "Pago Completado" : "Pendiente de pago"}</b></p>

                            <h4 className="my-4">Estado del pedido:</h4>
                            <p className={order.state && String(order.state).includes('Entregado') ? "greenColor" : "redColor"} ><b>{state}</b></p>

                            <h4 className="my-4">Productos Comprados:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {items && items.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Unidad(es)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn ml-4" id="login_btn" onClick={() => navigate(-1)}>Atrás</button>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
  )
}
