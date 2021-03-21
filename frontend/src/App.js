import './App.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router , Route} from 'react-router-dom';
import axios from 'axios';
import  { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'

import { loadUser } from './redux/actions/authActions';
import store from './store';

import ProtectedRoute from './components/route/ProtectedRoute';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

// Cart
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

// Order
import ListOrder from './components/order/ListOrder';
import OrderDetails from './components/order/OrderDetails';

// Auth
import LogIn from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

// Admin
import Dashboard from './components/admin/dashboard/Dashboard'; 
import ProductsList from './components/admin/products/ProductsList'; 
import NewProduct from './components/admin/products/NewProduct';
import UpdateProduct from './components/admin/products/UpdateProduct';
import OrdersList from './components/admin/orders/OrdersList';
import ProcessOrder from './components/admin/orders/ProcessOrder';
import UsersList from './components/admin/users/UsersList';
import UpdateUser from './components/admin/users/UpdateUser';
import ProductReviews from './components/admin/reviews/ProductReviews';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');
  useEffect(() => {
    store.dispatch(loadUser());
    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripe-api');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();
    // getStripeApiKey();
  }, [])

  // async function getStripeApiKey() {
  //   const { data } = await axios.get('api/v1/stripe-api');
  //   setStripeApiKey(data.stripeApiKey);
  // }

  const { user, isAuthenticated, logInInProcess } = useSelector(state => state.auth);
  return (
    <Router>
      <div className="App">
        <Header />
          <div className="container container-fluid">
            <Route path="/" component={Home} exact/>
            <Route path="/search/:keyword" component={Home} />
            <Route path="/product/:id" component={ProductDetails} exact/>

            <ProtectedRoute path="/cart" component={Cart} exact/>
            <ProtectedRoute path="/shipping" component={Shipping} exact/>
            <ProtectedRoute path="/confirm" component={ConfirmOrder} exact/> 
            <ProtectedRoute path="/success" component={OrderSuccess} exact/> 
            
            {stripeApiKey && 
              <Elements stripe={loadStripe(stripeApiKey)} >
                <ProtectedRoute path="/payment" component={Payment} exact/> 
              </Elements>
            }
            
            <Route path="/logIn" component={LogIn} exact/>
            <Route path="/register" component={Register} exact/>
            <ProtectedRoute path="/me" component={Profile} exact/>
            <ProtectedRoute path="/me/update" component={UpdateProfile} exact/>
            <ProtectedRoute path="/password/update" component={UpdatePassword} exact/>

            <Route path="/password/forgot" component={ForgotPassword} exact/>
            <Route path="/password/reset/:token" component={NewPassword} exact/>

            <ProtectedRoute path="/orders/me" component={ListOrder} exact/> 
            <ProtectedRoute path="/order/:id" component={OrderDetails} exact/> 
          </div>
          {/* Admin */}
          <ProtectedRoute path="/admin/dashboard" isAdmin={true} component={Dashboard}  exact/> 
          <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList}  exact/> 
          <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct}  exact/>
          <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct}  exact/>

          <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList}  exact/>
          <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder}  exact/>
          
          <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList}  exact/>
          <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser}  exact/>
          <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews}  exact/>


          {!logInInProcess && (!isAuthenticated || user.role !== 'admin') && (
            <Footer />
          )}
          <Footer />
          
      </div>
    </Router>
  );
}

export default App;
