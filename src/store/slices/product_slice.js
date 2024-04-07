import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from "../../api/api.js";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: []
    },
    reducers: {
        // addProduct(state, action) {
        //     state.products.push(action.payload);
        // },
        removeProduct(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload);
        }
    },
    extraReducers: (builder) => {

    }
});

export const { removeProduct} = productSlice.actions;
export default productSlice.reducer;

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (formData) => {
        console.log(formData);
        return api.post('/bouquets/add-bouquet', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    });
