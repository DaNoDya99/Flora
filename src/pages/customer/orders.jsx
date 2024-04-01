import {useSelector} from "react-redux";
import {useEffect} from "react";

function Orders() {
    const loggedIn = useSelector(state => state.customer.data.loggedIn);
    const role = useSelector(state => state.customer.data.role);
    useEffect(() => {
        if (!loggedIn || role !== 'customer') {
            window.location.href = '/auth/login';
        }
    }, [loggedIn, role]);

    return (
        <div>
            My orders
        </div>
    );
}

export default Orders;