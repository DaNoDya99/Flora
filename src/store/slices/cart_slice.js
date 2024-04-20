import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../api/api";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: {
            cart: [],
            errors: {},
            messages : {
                addItem : ''
            }
        }
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.cart = action.payload.cart;
                state.data.messages.addItem = action.payload.message;
                state.data.errors = {};
            } else {
                state.data.errors = action.payload.errors;
                state.data.messages.addItem = action.payload.message;
            }
        }).addCase(getCart.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.cart = action.payload.cart;
                state.data.errors = {};
            } else {
                state.data.errors = action.payload.errors;
            }
        });
    }
});

export default cartSlice.reducer;

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async (item) => {
        return api.post('/cart/add-item', item).then((response) => {
            console.log(response);
            return {
                statusFlag: 'success',
                cart: response.data.cart,
                status: response.status,
                message: response.data.message
            }
        }).catch((error) => {
            console.log(error.response);
            return {
                statusFlag: 'failed',
                errors: error.response.data,
                status: error.response.status,
                message: error.response.data.message
            }
        });
    }
);

export const getCart = createAsyncThunk(
    'cart/getCart',
    async (customer) => {
        return api.get('/cart/get-cart/' + customer).then((response) => {
            return {
                statusFlag: 'success',
                cart: response.data.cart,
                status: response.status
            }
        }).catch((error) => {
            return {
                statusFlag: 'failed',
                errors: error.response.data,
                status: error.response.status
            }
        });
    }
);
