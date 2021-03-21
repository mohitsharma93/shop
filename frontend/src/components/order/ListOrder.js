import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact'

import { myOrders, clearErrors } from '../../redux/actions/orderActions'
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const ListOrder = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { myOrdersInProcess, error, orders } = useSelector(state => state.myOrders);
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error])

  const setOrders = () => {
    const data = { 
      columns: [
        {
          label: 'Order Id',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Num Of Items',
          field: 'numOfItems',
          sort: 'asc'
        },
        {
          label: 'Amount',
          field: 'amount',
          sort: 'asc'
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc'
        },
        {
          label: 'Action',
          field: 'actions',
          sort: 'asc'
        }
      ],
      rows: []
    }
    orders.map(order => {
      data.rows.push({
				id: order._id,
				numOfItems: order.orderItems.length,
				amount: order.totalPrice,
				status:
					order.orderStatus &&
					String(order.orderStatus).includes('Delivered') ? (
						<p style={{ color: 'green' }}>{order.OrderStatus}</p>
					) : (
						<p style={{ color: 'red ' }}>{order.OrderStatus}</p>
					),
				actions: (
					<Link to={`/order/${order._id}`} className="btn btn-primary">
						<i className="fa fa-eye"></i>
					</Link>
				),
			});
      return order;
    })
    return data;
  }

  return (
    <Fragment>
      <MetaData title={'Orders'} />
      <h1 className="my-5">My Orders</h1>
      {myOrdersInProcess ? <Loader /> : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          striped
          bordered
          hover
        />
      )}
    </Fragment>
  )
}

export default ListOrder
