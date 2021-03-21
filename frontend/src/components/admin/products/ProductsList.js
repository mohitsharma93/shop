import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { MDBDataTable } from 'mdbreact'

import { getAdminProducts, clearErrors, deleteProduct } from '../../../redux/actions/productActions'
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';
import Sidebar from '../layout/Sidebar';

const ProductsList = ({ history }) => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { productsInProcess, error, products } = useSelector(state => state.product);
  const { productDeleteUpdateInProcess, error: deleteError, isDeleted } = useSelector(state => state.productDeleteUpdate);

  useEffect(() => {
    dispatch(getAdminProducts());
    if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
    if (deleteError) {
      alert.error(error);
			dispatch(clearErrors());
    }
    if (isDeleted) {
      history.push('/admin/products');
      alert.success('Product deleted successfully');
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, isDeleted, deleteError, history]);

  const setProducts = () => {
    const data = { 
      columns: [
        {
          label: 'Id',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Price',
          field: 'price',
          sort: 'asc'
        },
        {
          label: 'Stock',
          field: 'stock',
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
    products && products.map(product => {
      data.rows.push({
				id: product._id,
				name: product.name,
				price: product.price,
        stock: product.stock,
				actions: <Fragment>
					<Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
						<i className="fa fa-pencil"></i>
					</Link>
          <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
          <i className="fa fa-trash"></i>
          </button>
        </Fragment>
			});
      return product;
    })
    return data;
  }

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  return (
    <Fragment>
      <MetaData title={'All Products'} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />

        </div>
        <div className="col-12 col-md-10">
          <Fragment >
            <h1 className="my-5" >All Products</h1>
            {productsInProcess ? <Loader /> : (
              <MDBDataTable
                data={setProducts()}
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

export default ProductsList
