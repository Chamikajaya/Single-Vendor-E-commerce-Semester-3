import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute  from "./components/AdminRoute";


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import  ProfileScreen  from "./screens/ProfileScreen";

// Admin Related Screens ==>
import OrderListScreen from "./screens/Admin/OrderListScreen";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductEditScreen from "./screens/Admin/ProductEditScreen";
import UserListScreen from "./screens/Admin/UserListScreen";
import UserEditScreen from "./screens/Admin/UserEditScreen";


import store from './store';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import {HelmetProvider} from "react-helmet-async";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route  path='/search/:keyword' element={<HomeScreen />} />
      <Route  path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
      <Route  path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />

        {/* add all the private routes below  */}
        <Route path='' element={<PrivateRoute />} >
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
        </Route>

        {/* add all the admin related routes below  */}

        <Route path='' element={<AdminRoute />} >
            <Route path='/admin/orderList' element={<OrderListScreen />} />
            <Route path='/admin/productList' element={<ProductListScreen />} />
            <Route path='/admin/productList/:pageNumber' element={<ProductListScreen />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/admin/userList' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
        </Route>

    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <HelmetProvider>
    <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router} />
        </PayPalScriptProvider>
    </Provider>
     </HelmetProvider>

  </React.StrictMode>
);

reportWebVitals();
