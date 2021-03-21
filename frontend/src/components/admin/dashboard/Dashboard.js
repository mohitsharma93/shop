import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';
import Sidebar from '../layout/Sidebar';
import {
	getAdminProducts,
	clearErrors,
} from '../../../redux/actions/productActions';
import { getAllOrders } from '../../../redux/actions/orderActions';

const Dashboard = () => {
	const dispatch = useDispatch();

	const { error, products } = useSelector((state) => state.product);
	const { allOrders, allOrdersInProcess, totalAmounts } = useSelector(
		(state) => state.adminAllOrders
	);
	const { users } = useSelector(state => state.allUsers)
	const outOfStock = products.filter((product) => +product.stock === 0);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(getAdminProducts());
		dispatch(getAllOrders());
	}, [dispatch, error]);
	return (
		<Fragment>
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>
				<div className="col-12 col-md-10">
					<h1 className="my-4">Dashboard</h1>

					{allOrdersInProcess ? (
						<Loader />
					) : (
						<Fragment>
							<MetaData title={'Admin Dashboard'} />
							<div className="row pr-4">
								<div className="col-xl-12 col-sm-12 mb-3">
									<div className="card text-white bg-primary o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">
												Total Amount
												<br />
												<b>{totalAmounts }</b>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="row pr-4">
								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-success o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">
												Products
												<br />
												<b>{products && products.length}</b>
											</div>
										</div>
										<Link
											className="card-footer text-white clearfix small z-1"
											to="/admin/products"
										>
											<span className="float-left">View Details</span>
											<span className="float-right">
												<i className="fa fa-angle-right"></i>
											</span>
										</Link>
									</div>
								</div>

								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-danger o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">
												Orders
												<br />
												<b>{allOrders.length}</b>
											</div>
										</div>
										<Link
											className="card-footer text-white clearfix small z-1"
											to="/admin/orders"
										>
											<span className="float-left">View Details</span>
											<span className="float-right">
												<i className="fa fa-angle-right"></i>
											</span>
										</Link>
									</div>
								</div>

								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-info o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">
												Users
												<br />
												<b>{users && users.length}</b>
											</div>
										</div>
										<Link
											className="card-footer text-white clearfix small z-1"
											to="/admin/users"
										>
											<span className="float-left">View Details</span>
											<span className="float-right">
												<i className="fa fa-angle-right"></i>
											</span>
										</Link>
									</div>
								</div>

								<div className="col-xl-3 col-sm-6 mb-3">
									<div className="card text-white bg-warning o-hidden h-100">
										<div className="card-body">
											<div className="text-center card-font-size">
												Out of Stock
												<br />
												<b>{outOfStock && outOfStock.length}</b>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Dashboard;
