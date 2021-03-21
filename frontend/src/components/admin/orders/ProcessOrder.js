import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../../layout/MetaData';
import Loader from '../../layout/Loader';
import Sidebar from '../layout/Sidebar';

import {
	updateOrder,
	getOrderDetails,
	clearErrors,
} from '../../../redux/actions/orderActions';

const ProcessOrder = ({ match }) => {
	const [status, setStatus] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();

	const { orderDeleteUpdateInProcess, order } = useSelector(
		(state) => state.orderDetails
	);
	const {
		shippingAddress,
		orderItems,
		paymentInfo,
		user,
		totalPrice,
		OrderStatus,
	} = order;
	const { error, isUpdated } = useSelector((state) => state.order);

	const orderId = match.params.id;

	useEffect(() => {
		dispatch(getOrderDetails(orderId)); 

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success('Order Updated successfully.');
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error, isUpdated, orderId]);

	const updateOrderHandler = (e) => {
		const formData = new FormData();
		formData.set('status', status);

		dispatch(updateOrder(orderId, formData));
	};

	const shippingDetails = shippingAddress && `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}`;
	const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false;

	return (
		<Fragment>
			<MetaData title={`Process Order #${order._id}`} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>
				<div className="col-12 col-md-10">
					<Fragment>
						{orderDeleteUpdateInProcess ? (
							<Loader />
						) : (
							<div className="row d-flex justify-content-around">
								<div className="col-12 col-lg-7 order-details">
									<h1 className="my-5">Order # {order._id}</h1>

									<h4 className="mb-4">Shipping Info</h4>
									<p>
										<b>Name:</b> {user && user.name}
									</p>
									<p>
										<b>Phone:</b> {shippingAddress && shippingAddress.phoneNumber}
									</p>
									<p className="mb-4">
										<b>Address:</b>
										{shippingDetails}
									</p>
									<p>
										<b>Amount:</b> {totalPrice}
									</p>

									<hr />

									<h4 className="my-4">Payment</h4>
									<p className={isPaid ? 'greenColor' : 'redColor'}>
										<b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
									</p>

                  <h4 className="my-4">Payment</h4>
									<p>
										<b>{paymentInfo && paymentInfo.id}</b>
									</p> 

									<h4 className="my-4">Order Status:</h4>
									<p
										className={
											String(OrderStatus).includes('Delivered')
												? 'greenColor'
												: 'redColor'
										}
									>
										<b>{OrderStatus}</b>
									</p>

									<h4 className="my-4">Order Items:</h4>

									<hr />
									<div className="cart-item my-1">
                  {orderItems &&
									orderItems.map((order) => (
										<div className="row my-5" key={order.product}>
											<div className="col-4 col-lg-2">
												<img src={order.image} alt={order.name} height="45" width="65" />
											</div>

											<div className="col-5 col-lg-5">
												<Link to={`/product/${order.product}`}>{order.name}</Link>
											</div>

											<div className="col-4 col-lg-2 mt-4 mt-lg-0">
												<p>{order.price}</p>
											</div>

											<div className="col-4 col-lg-3 mt-4 mt-lg-0">
												<p>{order.quantity} Piece(s)</p>
											</div>
										</div>
									))}
									</div>
									<hr />
								</div>

								<div className="col-12 col-lg-3 mt-5">
									<h4 className="my-4">Status</h4>

									<div className="form-group">
										<select className="form-control" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
											<option value="Processing">Processing</option>
											<option value="Shipped">Shipped</option>
											<option value="Delivered">Delivered</option>
										</select>
									</div>

									<button className="btn btn-primary btn-block" onClick={() => updateOrderHandler(order._id)}>
										Update Status
									</button>
								</div>
							</div>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default ProcessOrder;
