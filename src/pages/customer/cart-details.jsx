import { useNavigate } from "react-router-dom";

function CartDetails(){
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/order/delivery-details',{state: {message : "Message from Cart Details"}});
    }

    return (
        <div>
            <h1>Cart Details</h1>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
}

export default CartDetails;