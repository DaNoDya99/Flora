import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from "../../api/api.js";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: {
            products: []
        },
        message: {
            addProduct: '',
            getProducts: ''
        },
        errors: {
            addProduct: {},
            getProducts: {}
        }
    },
    reducers: {
        removeProduct(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addProduct.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.message.addProduct = action.payload.message;
                window.location.reload();
            }else{
                state.errors.addProduct = action.payload.errors;
            }
        }).addCase(getProducts.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.products = action.payload.products;
                state.message.getProducts = action.payload.message;
            }else{
                state.errors.getProducts = action.payload.errors;
            }
        });
    }
});

export const { removeProduct} = productSlice.actions;
export default productSlice.reducer;

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (formData) => {
        return api.post('/bouquets/add-bouquet', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return {
                statusFlag: 'success',
                message: response.data.message,
                status : response.data.status
            }
        }).catch(error => {
            return {
                statusFlag: 'failed',
                errors: error.response.data.errors,
                status : error.response.data.status
            }
        });
    });

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async () => {
        return api.get('/bouquets/get-bouquets').then(response => {
            return {
                products: response.data.bouquets,
                statusFlag: 'success',
                status: response.data.status
            }
        }).catch(error => {
            console.log(error.response.data);
            return {
                statusFlag: 'failed',
                errors: error.response.data.errors,
                status: error.response.status
            }
        });
    });