import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { addItemToCart, removeCartItem } from '../../redux/actions/cartActions';

const Cart = ({ history }) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { cartItems } = useSelector((state) => state.cart);

	const manageQty = (which, quantity, stock, id) => {
		if (which === 'increase') {
			const newQty = quantity + 1;
			if (newQty > stock) return;
			dispatch(addItemToCart(id, newQty));
		} else {
			if (which === 'decrease') {
				const newQty = quantity - 1;
				if (newQty <= 0) return;
				dispatch(addItemToCart(id, newQty));
			}
		}
	};

  const removeItem = (id) => {
    dispatch(removeCartItem(id))
  }

	const checkoutHandler = (e) => {
    history.push('/login?redirect=shipping');
  }

	return (
		<Fragment>
			{cartItems.length === 0 ? (
				<h2 className="mt-5">Your cart is empty</h2>
			) : (
				<Fragment>
					<h2 className="mt-5">
						Your Cart: <b>{cartItems.length} items</b>
					</h2>
					<div className="row d-flex justify-content-between">
						<div className="col-12 col-lg-8">
							{cartItems.map((item, index) => (
								<Fragment>
									<div className="cart-item" key={item.product}>
										<div className="row">
											<div className="col-4 col-lg-3">
												<img
													src={item.image}
													alt="Laptop"
													height="90"
													width="115"
												/>
											</div>

											<div className="col-5 col-lg-3">
												<Link to={`product/${item.product}`}>{item.name}</Link>
											</div>
											<div className="col-4 col-lg-2 mt-4 mt-lg-0">
												<p id="card_item_price">${item.price}</p>
											</div>
											<div className="col-4 col-lg-3 mt-4 mt-lg-0">
												<div className="stockCounter d-inline">
													<span
														className="btn btn-danger minus"
														onClick={() => manageQty('decrease', item.quantity, item.stock, item.product)}
													>
														-
													</span>
													<input
														type="number"
														className="form-control count d-inline"
														value={item.quantity}
														readOnly
													/>
													<span
														className="btn btn-primary plus"
														onClick={() => manageQty('increase', item.quantity, item.stock, item.product)}
													>
														+
													</span>
												</div>
											</div>
											<div className="col-4 col-lg-1 mt-4 mt-lg-0">
												<i
													id="delete_cart_item"
													className="fa fa-trash btn btn-danger"
                          onClick={() => removeItem(item.product)}
												></i>
											</div>
										</div>
									</div>
									<hr />
								</Fragment>
							))}
						</div>
						<div className="col-12 col-lg-3 my-4">
							<div id="order_summary">
								<h4>Order Summary</h4>
								<hr />
								<p>
									Subtotal:
									<span className="order-summary-values">
										{cartItems.reduce((acc, val) => acc + Number(val.quantity), 0)} (Units)
									</span>
								</p>
								<p>
									Est. total: 
									<span className="order-summary-values">${cartItems.reduce((acc, val) => acc + Number(val.quantity *  val.price), 0).toFixed(2)}</span>
								</p>
								<hr />
								<button id="checkout_btn" className="btn btn-primary btn-block"  onClick={checkoutHandler}>
									Check out
								</button>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Cart;
