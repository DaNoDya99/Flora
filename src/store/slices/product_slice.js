import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: []
    },
    reducers: {
        addProduct(state, action) {
            state.products.push(action.payload);
        },
        removeProduct(state, action) {
            state.products = state.products.filter(product => product.id !== action.payload);
        }
    }
});

export const {addProduct, removeProduct} = productSlice.actions;
export default productSlice.reducer;