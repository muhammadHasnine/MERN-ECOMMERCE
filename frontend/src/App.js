import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import Webfont from "webfontloader";
import Home from "./component/Home";
import ProductDetails from "./component/ProductDetails";
import Products from "./component/Products";
import Search from "./component/Search";
import LoginSingup from "./component/user/LoginSingup";
import UserOption from "./component/layout/UserOption";
import Profile from "./component/user/Profile";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePasseord from "./component/user/UpdatePasseord";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import Payment from "./component/cart/Pyment";
import OrderSuccess from "./component/cart/OrderSuccess";
import MyOrder from "./component/Order/MyOrder";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProdcut";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UserList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from './component/contact/Contact';
import About from './component/about/About';
import NotFound from './component/NotFound'
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    Webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  window.addEventListener("contextmenu",(e)=>e.preventDefault())
  return (
  
      <Router>
        <Header />
        {isAuthenticated && <UserOption user={user} />}
        <Routes>

          Genarel Routes 🛒🛒🛒🛒🛒🛒🛒🛒🛒
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/login" element={<LoginSingup />} />
            
            Protected Routes for Admin and User 👇👇👇👇
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectAdmin="login"
              />
            }
          >
            <Route path="/account" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePasseord />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/process/payment" element={<Payment />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/orders" element={<MyOrder />} />
            <Route path="/order/:id" element={<OrderDetails />} />
          </Route>

          Protected Routes for Admin only 🛃🛃🛃🛃🛃🛃
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
                redirectAdmin="/"
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/product" element={<NewProduct />} />
            <Route path="/admin/product/:productId" element={<UpdateProduct/>} />
            <Route path="/admin/orders" element={<OrderList/>} />
            <Route path="/admin/order/:id" element={<ProcessOrder/>} />
            <Route path="/admin/users" element={<UserList/>} />
            <Route path="/admin/user/:userId" element={<UpdateUser/>} />
            <Route path="/admin/reviews" element={<ProductReviews/>} />
          </Route>

          Genarel Routes 🛒🛒🛒🛒🛒🛒🛒🛒🛒
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/about" element={<About/>} />
          <Route path="*" element={<NotFound/>} />  
        </Routes>
        <Footer />
        <ToastContainer position="bottom-center" newestOnTop />
      </Router>
  );
};

export default App;
