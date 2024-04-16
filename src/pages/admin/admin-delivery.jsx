import React from 'react';
import {useSelector} from "react-redux";

function AdminDelivery() {
    const isLoggedIn = useSelector(state => state.employeeAuth.loggedIn);
    const employee = useSelector(state => state.employeeAuth.localStorage);

    if (!isLoggedIn || employee.role !== 'admin') {
        window.location.href = '/employee/login';
    }

    return (
        <div>
            Admin Delivery
        </div>
    );
}

export default AdminDelivery;