import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const OrdersList = () => {
    const navigate= useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Pedido eliminado correctamente');
            navigate('/orderList');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isDeleted])


    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Fecha',
                    field: 'date',
                    sort: 'asc'
                },
                {
                    label: 'No. Orden',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: '# Items',
                    field: 'numItems',
                    sort: 'asc'
                },
                {
                    label: 'Valor Total',
                    field: 'totalAmount',
                    sort: 'asc'
                },
                {
                    label: 'Estado',
                    field: 'state',
                    sort: 'asc'
                },
                {
                    label: 'Acciones',
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            var date= new Date(order.dateCreate).toLocaleDateString()
            
            data.rows.push({
                date: date,
                id: order._id,
                numItems: order.items.length,
                totalAmount: `$${order.priceTotal}`,
                state: order.state && String(order.state).includes('Entregado')
                    ? <p style={{ color: 'green' }}>{order.state}</p>
                    : <p style={{ color: 'red' }}>{order.state}</p>,
                actions: 
                <Fragment>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'Todos los Pedidos'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Todos los pedidos</h1>

                        {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default OrdersList