import React, { Fragment, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {
	getProductDetails,
	clearErrors,
	newReview
} from '../../redux/actions/productActions';

import Product from './Product';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

import { addItemToCart } from '../../redux/actions/cartActions';
import * as productConstants from '../../redux/constants/productConstants';
import  ListReview from '../review/ListReview';

const ProductDetails = ({ match }) => {
	const [quantity, setQuantity] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const dispatch = useDispatch();
	const alert = useAlert();
	const { error, productDetailInProcess, productDetails } = useSelector(
		(state) => state.productDetails
	);
	const { user } = useSelector((state) => state.auth);
	const { error: reviewError, success } = useSelector((state) => state.newReview);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors(error));
		}
		if (reviewError) {
			alert.error(reviewError);
			dispatch({ 
				type: productConstants.NEW_REVIEW_RESET
			});
		}

		if (success) {
			alert.success('Review Posted successfully.');
			dispatch(clearErrors(success));
		}
		dispatch(getProductDetails(match.params.id));
	}, [alert, dispatch, error, match.params.id, reviewError, success]);

	const manageQty = (which) => {
		const countElement = document.querySelector('.count');
		if (which === 'increase') {
			if (countElement.valueAsNumber >= productDetails.stock) return;
			setQuantity(countElement.valueAsNumber + 1);
		} else {
			if (which === 'decrease') {
				if (countElement.valueAsNumber <= 1) return;
				setQuantity(countElement.valueAsNumber - 1);
			}
		}
	};

	const addToCart = () => {
		dispatch(addItemToCart(match.params.id, quantity));
		alert.success('Item added to cart.');
	};

	function setUserReview() {
		const stars = document.querySelectorAll('.star');
		stars.forEach((star, index) => {
			star.starValue = index + 1;
			['click', 'mouseover', 'mouseout'].forEach((e) => {
				star.addEventListener(e, showRatings);
			})
		});

		function showRatings(e) {
			stars.forEach((star, index) => {
				if (e.type === 'click') {
					if(index < this.starValue) {
						star.classList.add('orange');
						setRating(this.starValue);
					} else {
						star.classList.remove('orange')
					}
				}
				if (e.type === 'mouseover') {
					if(index < this.starValue) {
						star.classList.add('yellow');
					} else {
						star.classList.remove('yellow')
					}
				}
				if (e.type === 'mouseout') {
					if(index < this.starValue) {
						star.classList.remove('yellow');
					}
				}
			})
		}
	}

	const reviewHandler = () => {
		const formData = new FormData();

		formData.set('rating', rating);
		formData.set('comment', comment);
		formData.set('productId', match.params.id);

		dispatch(newReview(formData))
	}
	
	return (
		<Fragment>
			{productDetailInProcess ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={productDetails.name} />
					<div className="row f-flex justify-content-around">
						<div className="col-12 col-lg-5 img-fluid" id="product_image">
							<Carousel pause="hover">
								{productDetails.images &&
									productDetails.images.map((image) => (
										<Carousel.Item key={image._id}>
											<img
												className="d-block w-100"
												src={image.url}
												alt={productDetails.title}
											/>
										</Carousel.Item>
									))}
							</Carousel>
						</div>

						<div className="col-12 col-lg-5 mt-5">
							<h3>{productDetails?.name}</h3>
							<p id="product_id">Product # {productDetails._id}</p>

							<hr />

							<div className="rating-outer">
								<div
									className="rating-inner"
									style={{ width: `${(productDetails.rating / 5) * 100}%` }}
								></div>
							</div>
							<span id="no_of_reviews">
								({productDetails.numOfReviews} Reviews)
							</span>

							<hr />

							<p id="product_price">${productDetails.price}</p>
							<div className="stockCounter d-inline">
								<span
									className="btn btn-danger minus"
									onClick={() => manageQty('decrease')}
								>
									-
								</span>

								<input
									type="number"
									className="form-control count d-inline"
									value={quantity}
									readOnly
								/>

								<span
									className="btn btn-primary plus"
									onClick={() => manageQty('increase')}
								>
									+
								</span>
							</div>
							<button
								type="button"
								id="cart_btn"
								className="btn btn-primary d-inline ml-4"
								disabled={productDetails.stock === 0}
								onClick={addToCart}
							>
								Add to Cart
							</button>

							<hr />

							<p>
								Status:{' '}
								<span
									id="stock_status"
									className={
										productDetails.stock > 0 ? 'greenColor' : 'redColor'
									}
								>
									{productDetails.stock > 0
										? `In Stock (${productDetails.stock})`
										: 'Out of Stock'}
								</span>
							</p>

							<hr />

							<h4 className="mt-2">Description:</h4>
							<p>{productDetails.description}</p>
							<hr />
							<p id="product_seller mb-3">
								Sold by: <strong>{productDetails.seller}</strong>
							</p>
							{user ? (
								<button
									id="review_btn"
									type="button"
									className="btn btn-primary mt-4"
									data-toggle="modal"
									data-target="#ratingModal"
									onClick={setUserReview}
								>
									Submit Your Review
								</button>
							) : (
								<div className="alert alert-danger mt-5" type="alert">
									Login to post your review.
								</div>
							)}

							<div className="row mt-2 mb-5">
								<div className="rating w-50">
									<div
										className="modal fade"
										id="ratingModal"
										tabIndex="-1"
										role="dialog"
										aria-labelledby="ratingModalLabel"
										aria-hidden="true"
									>
										<div className="modal-dialog" role="document">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title" id="ratingModalLabel">
														Submit Review
													</h5>
													<button
														type="button"
														className="close"
														data-dismiss="modal"
														aria-label="Close"
													>
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
												<div className="modal-body">
													<ul className="stars">
														<li className="star">
															<i className="fa fa-star"></i>
														</li>
														<li className="star">
															<i className="fa fa-star"></i>
														</li>
														<li className="star">
															<i className="fa fa-star"></i>
														</li>
														<li className="star">
															<i className="fa fa-star"></i>
														</li>
														<li className="star">
															<i className="fa fa-star"></i>
														</li>
													</ul>

													<textarea
														name="review"
														id="review"
														className="form-control mt-3"
														value={comment}
														onChange={(e) => setComment(e.target.value)}
													></textarea>

													<button
														className="btn my-3 float-right review-btn px-4 text-white"
														data-dismiss="modal"
														aria-label="Close"
														onClick={reviewHandler}
													>
														Submit
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{productDetails.reviews && productDetails.reviews.length > 0 &&  <ListReview reviews={productDetails.reviews}/> }
				</Fragment>
			)}
		</Fragment>
	);
};

export default ProductDetails;
