import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/product_slice'
import customerSlice from './slices/customer_slice'
import employeeSlice from './slices/employee_slice'
import categorySlice from './slices/category_slice'
import subCategorySlice from './slices/sub_category_slice'
import employeeAuthSlice from "./slices/employee_auth_slice.js";
import cartSlice from "./slices/cart_slice.js";

export default configureStore({
    reducer: {
        product: productSlice,
        customer: customerSlice,
        employee: employeeSlice,
        category: categorySlice,
        subCategory: subCategorySlice,
        employeeAuth: employeeAuthSlice,
        cart : cartSlice
    }
})