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
import EmployeeAuthLayout from "./layouts/employee-auth-layout.jsx";
import EmployeeLogin from "./pages/auth/employee-login.jsx";
import EmployeeLayout from "./layouts/employee-layout.jsx";
import AdminDashboard from "./pages/admin/admin-dashboard.jsx";
import AdminEmployee from "./pages/admin/admin-employee.jsx";
import AdminInventory from "./pages/admin/admin-inventory.jsx";
import DeliveryDashboard from "./pages/delivery/delivery-dashboard.jsx";
import DeliveryPendingOrders from "./pages/delivery/delivery-pending-orders.jsx";
import AdminDelivery from "./pages/admin/admin-delivery.jsx";

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

        <Route path={"employee"} element={<EmployeeAuthLayout/>} >
            <Route path={"login"} element={<EmployeeLogin/>} />
        </Route>

        <Route path={'admin'} element={<EmployeeLayout/>} >
            <Route path={'dashboard'} element={<AdminDashboard/>} />
            <Route path={'inventory'} element={<AdminInventory/>} />
            <Route path={'employee'} element={<AdminEmployee/>} />
            <Route path={'delivery'} element={<AdminDelivery/>} />
        </Route>

        <Route path={"delivery"} element={<EmployeeLayout/>} >
            <Route path={"dashboard"} element={<DeliveryDashboard/>} />
            <Route path={"pending-orders"} element={<DeliveryPendingOrders/>} />
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
