import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/product_slice'
import customerSlice from './slices/customer_slice'

export default configureStore({
    reducer: {
        product: productSlice,
        customer: customerSlice
    }
})