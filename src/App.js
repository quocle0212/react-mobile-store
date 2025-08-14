import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./react-setup/store";
import { Provider } from "react-redux";
import store from "./react-setup/store";
import Header from "./shared/componenets/layout/Header";
import Menu from "./shared/componenets/layout/Menu";
import Slider from "./shared/componenets/layout/Slider";
import Footer from "./shared/componenets/layout/Footer";
import Sidebar from "./shared/componenets/layout/Sidebar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import Category from "./pages/Category";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CustomerUpdate from "./pages/CustomerUpdate";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import ProtectedRoute from "./shared/componenets/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Header />
        <div id="body">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <nav>
                  <Menu />
                </nav>
              </div>
            </div>
            <div className="row">
              <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                <Slider />
                <Routes>

                  <Route element={<ProtectedRoute />}>
                    <Route path="/Orders" element={<Orders />} />
                    <Route path="/OrderDetails-:id" element={<OrderDetails />} />
                    <Route path="/Success" element={<Success />} />
                    <Route path="/Profile" element={<CustomerUpdate />} />
                  </Route>

                  <Route path="/" element={<Home />} />
                  <Route path="/SignIn" element={<SignIn />} />
                  <Route path="/SignUp" element={<SignUp />} />
                  <Route path="/Category-:id" element={<Category />} />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/ProductDetails-:id" element={<ProductDetails />} />
                  <Route path="/Search" element={<Search />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
