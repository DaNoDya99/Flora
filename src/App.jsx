import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import AuthLayout from "./layouts/auth_layout.jsx";
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import CustomerLayout from "./layouts/customer_layout.jsx";
import Home from "./pages/customer/home.jsx";
import Product from "./pages/customer/product.jsx";
import Products from "./pages/customer/products.jsx";
import ResetPassword from "./pages/auth/reset-password.jsx";
import CartDetails from "./pages/customer/cart-details.jsx";
import OrderLayout from "./layouts/order_layout.jsx";
import DeliveryDetails from "./pages/customer/delivery-details.jsx";
import ShoppingCart from "./pages/customer/shopping-cart.jsx";
import PaymentDetails from "./pages/customer/payment-details.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path={"auth"} element={<AuthLayout/>} >
            <Route path={"login"} element={<Login/>} />
            <Route path={"register"} element={<Register/>} />
            <Route path={"forgot-password"} element={<ResetPassword/>} />
        </Route>

        <Route path={"/"} element={<CustomerLayout/>} >
            <Route index element={<Home/>} />
            <Route path={"products/:category"} element={<Products/>} loader={({params}) => {
                return params.category;
            }}/>
            <Route path={"product/:category/:id"} element={<Product/>} loader={({params}) => {
                return {
                    category: params.category,
                    id: params.id
                }
            }}/>
        </Route>
        
        <Route path={"order"} element={<OrderLayout/>} >
            <Route path={'shopping-cart'} element={<ShoppingCart/>}/>
            <Route path={'cart-details'} element={<CartDetails/>}/>
            <Route path={'delivery-details'} element={<DeliveryDetails/>}/>
            <Route path={'payment-details'} element={<PaymentDetails/>}/>
        </Route>
    </Route>
));

function App() {

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
