import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../../layout/MetaData';
import Loader from '../../layout/Loader';
import Sidebar from '../layout/Sidebar';
import { getProductDetails, clearErrors, updateProduct } from '../../../redux/actions/productActions'

const UpdateProduct = ({ match, history}) => {
  const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [seller, setSeller] = useState('');
	const [stock, setStock] = useState('');
	const [images, setImages] = useState([]);
	const [OldImages, setOldImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
		'Electronics',
		'Laptop',
		'Accessories',
		'Food',
		'Books',
		'Clothes/Shoes',
		'Beauty/Health',
    'Cameras',
    'Headphones',
    'Sports',
    'Outdoor',
    'Home'
	];

  const alert = useAlert();
	const dispatch = useDispatch();

	const { error, productDetailInProcess, productDetails } = useSelector(
		(state) => state.productDetails
	);
  const { productDeleteUpdateInProcess, error: updateError, isUpdated } = useSelector(
		(state) => state.productDeleteUpdate
	);

  const productId = match.params.id;

  useEffect(() => {
		
		if (productDetails && productDetails._id !== productId) {
      dispatch(getProductDetails(productId))
			
    } else {
      setName(productDetails.name);
      setPrice(productDetails.price);
      setDescription(productDetails.description);
      setCategory(productDetails.category);
      setSeller(productDetails.seller);
      setStock(productDetails.stock);
      setOldImages(productDetails.images)
    }

		if (error) {
			alert(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			alert(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			history.push('/admin/products');
			alert.success('Product created successfully.');
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error, isUpdated, history, updateError, productDetails, productId]);

  const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set('name', name);
		formData.set('price', price);
		formData.set('description', description);
		formData.set('category', category);
		formData.set('seller', seller);
		formData.set('stock', stock);

		images.forEach((img) => {
			formData.append('images', img);
		});

		dispatch(updateProduct(productDetails._id, formData));
	};

  const onChange = (e) => {
		const files = Array.from(e.target.files);
		setImagesPreview([]);
    setOldImages([])
		setImages([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview((oldArray) => [...oldArray, reader.result]);
					setImages((oldArray) => [...oldArray, reader.result]);
				}
			};

			reader.readAsDataURL(file);
		});
	};

  return (
    <Fragment>
			<MetaData title={'Create Products'} />
			<div className="row">
				<div className="col-12 col-md-2">
					<Sidebar />
				</div>
				<div className="col-12 col-md-10">
					<Fragment>
						<div className="wrapper my-5">
							<form className="shadow-lg" encType="multipart/form-data" onSubmit={submitHandler}>
								<h1 className="mb-4">New Product</h1>

								<div className="form-group">
									<label htmlFor="name_field">Name</label>
									<input
										type="text"
										id="name_field"
										className="form-control"
										value={name}
                    onChange={(e) => setName(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="price_field">Price</label>
									<input
										type="text"
										id="price_field"
										className="form-control"
										value={price}
                    onChange={(e) => setPrice(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="description_field">Description</label>
									<textarea
										className="form-control"
										id="description_field"
										rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
									></textarea>
								</div>

								<div className="form-group">
									<label htmlFor="category_field">Category</label>
									<select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
										{categories && categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="stock_field">Stock</label>
									<input
										type="number"
										id="stock_field"
										className="form-control"
										value={stock}
                    onChange={(e) => setStock(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="seller_field">Seller Name</label>
									<input
										type="text"
										id="seller_field"
										className="form-control"
										value={seller}
                    onChange={(e) => setSeller(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label>Images</label>

									<div className="custom-file">
										<input
											type="file"
											name="product_images"
											className="custom-file-input"
											id="customFile"
											multiple
                      onChange={onChange}
										/>
										<label className="custom-file-label" htmlFor="customFile">
											Choose Images
										</label>
									</div>
                  {OldImages && OldImages.map(img => (
                    <img src={img.url} alt={img.url} key={img} className="mt-3 mr-2" width="55" height="52 " accept="images/*"/>
                  ))}

                  {imagesPreview.map(img => (
                    <img src={img} alt={'Images Preview'} key={img} className="mt-3 mr-2" width="55" height="52 " accept="images/*"/>
                  ))}
								</div>

								<button
									id="login_button"
									type="submit"
									className="btn btn-block py-3"
                  disabled={productDeleteUpdateInProcess ? true : false}
								>
									CREATE
								</button>
							</form>
						</div>
					</Fragment>
				</div>
			</div>
		</Fragment>
  )
}

export default UpdateProduct
