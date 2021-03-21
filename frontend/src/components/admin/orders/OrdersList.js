import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact'

import MetaData from '../../layout/MetaData';
import Loader from '../../layout/Loader';
import Sidebar from '../layout/Sidebar';

import {
	getAllOrders ,
	clearErrors,
  deleteOrder
} from '../../../redux/actions/orderActions';

const OrdersList = ({ history }) => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { allOrdersInProcess, error, allOrders,  totalAmounts } = useSelector(state => state.adminAllOrders);
  const { isDeleted } = useSelector(state => state.order)

  useEffect(() => {
    dispatch(getAllOrders());

    if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

    if (isDeleted) {
      alert.success('Product deleted successfully');
      history.push('/admin/orders');
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, isDeleted, history]);

  const deleteProductHandler = (id) => {
    dispatch(deleteOrder(id))
  }

  const setOrders = () => {
    const data = { 
      columns: [
        {
          label: 'order Id',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'No. Of Items',
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
    allOrders && allOrders.map(order => {
      data.rows.push({
				id: order._id,
				numOfItems : order.orderItems.length,
				amount: order.totalPrice,
        status:
					order.OrderStatus &&
					String(order.OrderStatus).includes('Delivered') ? (
						<p style={{ color: 'green' }}>{order.OrderStatus}</p>
					) : (
						<p style={{ color: 'red' }}>{order.OrderStatus}</p>
					),
				actions: <Fragment>
					<Link to={`/admin/order/${order._id}`} className="btn btn-primary">
						<i className="fa fa-eye"></i>
					</Link>
          <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(order._id)}>
          <i className="fa fa-trash"></i>
          </button>
        </Fragment>
			});
      return order ;
    })
    return data;
  }

  return (
    <Fragment>
      <MetaData title={'All Orders'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />

        </div>
        <div className="col-12 col-md-10">
          <Fragment >
            <h1 className="my-5" >All Orders</h1>
            {allOrdersInProcess ? <Loader /> : (
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                striped
                bordered
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
