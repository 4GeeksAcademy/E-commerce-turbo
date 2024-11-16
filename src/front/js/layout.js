import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import ProductPage from "./pages/ProductPage";
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Register from './component/Register';
import ProductList from './component/ProductList';
import Product from './component/Product';
import Cart from './component/Cart';
import Checkout from "./component/Checkout";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from './component/PaymentForm';




const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <Elements stripe={stripePromise}>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <PaymentForm />
                                        
                    <Routes>
                       {/* Rutas principales */}
                    <Route path="/" element={<Home />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/single/:theid" element={<Single />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<ProductPage />} path="/product" /> 
                    {/* Rutas de productos */}
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />

                    {/* Rutas de pago */}
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />

                    {/* Ruta de error para rutas no definidas */}
                    <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
            </Elements>
        </div>
    );
};

export default injectContext(Layout);
