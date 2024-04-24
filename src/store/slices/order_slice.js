 import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../api/api.js"
 import dayjs from "dayjs";

 const orderSlice = createSlice({
    name : "order",
    initialState: {
        data : {
            orders : [],
            orderCountsByCity : [],
            order : {
                order_items : [],
                total : 0,
                customer : '',
                sender_name : '',
                sender_email : '',
                sender_phone : '',
                recipient_name : '',
                recipient_address : '',
                recipient_city : '',
                recipient_phone : '',
                delivery_method : '',
                delivery_date : '',
                payment_method : ''
            }
        },
        message : {
            placeOrder : '',
            assignDeliveryPerson : '',
            updateOrderStatus : ''
        },
        errors : {
            placeOrder : {},
            getOrders : {},
            getOrder : {}
        }
    },
    reducers : {
        setOrderItems : (state, action) => {
            state.data.order.order_items = action.payload;
        },
        setOrderTotal : (state, action) => {
            state.data.order.total = action.payload;
        },
        setSenderRecipient : (state, action) => {
            state.data.order.sender_name = action.payload.sender_name;
            state.data.order.sender_email = action.payload.sender_email;
            state.data.order.sender_phone = action.payload.sender_phone;
            state.data.order.recipient_name = action.payload.recipient_name;
            state.data.order.recipient_address = action.payload.recipient_address;
            state.data.order.recipient_city = action.payload.recipient_city;
            state.data.order.recipient_phone = action.payload.recipient_phone;
        },
        setDeliveryDetails : (state, action) => {
            state.data.order.delivery_method = action.payload.delivery_method;
            state.data.order.delivery_date = dayjs(action.payload.delivery_date).format('YYYY-MM-DD');
        },
        setPaymentDetails : (state, action) => {
            state.data.order.payment_method = action.payload.payment_method;
        },
        setCustomer : (state, action) => {
            state.data.order.customer = action.payload.customer;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.message.placeOrder = action.payload.message;
                state.errors.addOrder = {};

                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                state.errors.addOrder = action.payload.errors;
            }
        }).addCase(getCustomerOrders.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.orders = action.payload.orders;
            } else {
                state.errors.getOrders = action.payload.errors;
            }
        }).addCase(getOrderDetailsById.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.order = action.payload.order;
            } else {
                state.errors.getOrder = action.payload.errors;
            }
        }).addCase(getOrderDetailsByStatus.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.orders = action.payload.orders;
            } else {
                state.errors.getOrders = action.payload.errors;
            }
        }).addCase(getOrderPendingOrderCountsGroupedByCity.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.orderCountsByCity = action.payload.orders;
            } else {
                state.errors.getOrders = action.payload.errors;
            }
        }).addCase(assignDeliveryPerson.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.message.assignDeliveryPerson = action.payload.message;
            } else {
                state.errors.assignDeliveryPerson = action.payload.errors;
            }
        }).addCase(updateOrderStatus.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.message.updateOrderStatus = action.payload.message;
            } else {
                state.errors.updateOrderStatus = action.payload.errors;
            }
        })
    }
})

export const {setOrderItems,
    setOrderTotal,
    setSenderRecipient,
    setDeliveryDetails,
    setPaymentDetails,
    setCustomer} = orderSlice.actions
export default orderSlice.reducer

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (order) => {
        return api.post('/orders/place-order', order).then((response) => {
            console.log(response)
            return {
                statusFlag: 'success',
                status: response.status,
                message: response.data.message
            }
        }).catch((error) => {
            console.log(error.response)
            return {
                statusFlag: 'failed',
                errors: error.response.data,
                status: error.response.status,
                message: error.response.data.message
            }
        });
    })

 export const getCustomerOrders = createAsyncThunk(
    'order/getCustomerOrders',
    async (customer) => {
        return api.get('/orders/get-customer-orders/'+customer).then(response => {
            return {
                statusFlag: 'success',
                orders: response.data
            }
        }).catch(error => {
            return {
                statusFlag: 'failed',
                errors: error.response.data.errors
            }
        });
    })

 export const getOrderDetailsById = createAsyncThunk(
    'order/getOrderDetailsById',
    async (order_id) => {
        return api.get('/orders/get-order/'+order_id).then(response => {
            return {
                statusFlag: 'success',
                order: response.data
            }
        }).catch(error => {
            return {
                statusFlag: 'failed',
                errors: error.response.data.errors
            }
        });
    })

 export const getOrderDetailsByStatus = createAsyncThunk(
    'order/getOrderDetailsByStatus',
    async (status) => {
        return api.get('/orders/get-orders/'+status).then(response => {
            // console.log(response)
            return {
                statusFlag: 'success',
                orders: response.data
            }
        }).catch(error => {
            return {
                statusFlag: 'failed',
                errors: error.response.data.errors
            }
        });
    })

 export const getOrderPendingOrderCountsGroupedByCity = createAsyncThunk(
    'order/getOrderPendingOrderCountsGroupedByCity',
    async () => {
        return api.get('/orders/get-pending-order_counts-groupedby-city').then(response => {
            return {
                statusFlag: 'success',
                orders: response.data
            }
        }).catch(error => {
            return {
                statusFlag: 'failed',
                errors: error.response.data.errors
            }
        });
    })

 export const assignDeliveryPerson = createAsyncThunk(
    'order/assignDeliveryPerson',
    async (data) => {
        return api.post('/orders/assign-delivery-person', data).then(response => {
            console.log(response)
            return {
                statusFlag: 'success',
                message: response.data.message
            }
        }).catch(error => {
            console.log(error.response)
            return {
                statusFlag: 'failed',
                errors: error.response.data.errors
            }
        });
    })

 export const updateOrderStatus = createAsyncThunk(
    'order/updateOrderStatus',
    async (data) => {
        return api.post('/orders/update-order-status', data).then(response => {
            console.log(response)
            return {
                statusFlag: 'success',
                message: response.data.message
            }
        }).catch(error => {
            console.log(error.response)
            return {
                statusFlag: 'failed',
                errors: error.response.data.errors
            }
        });
    })
