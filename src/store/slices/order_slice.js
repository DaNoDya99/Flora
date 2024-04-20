 import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../api/api.js"
 import dayjs from "dayjs";

 const orderSlice = createSlice({
    name : "order",
    initialState: {
        data : {
            orders : [],
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
            placeOrder : ''
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
