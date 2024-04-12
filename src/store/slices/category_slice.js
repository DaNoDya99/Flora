import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../api/api';
import all from '../../utils/functions.js';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        data : {
            categories: [],
            errors: {},
        }
    },
    reducers: {
        
    },
    extraReducers: (builder) =>  {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.categories = action.payload.categories;
                state.data.errors = {};
            } else {
                state.data.errors = action.payload.errors;
            }
        });
    }
});

export default categorySlice.reducer;

export const getCategories = createAsyncThunk(
    'category/getCategories',
    async () => {
        return api.get('/categories/get').then((response) => {
            // console.log(response);
            return {
                statusFlag: 'success',
                categories: response.data.categories,
                status : response.status
            }
        }).catch((error) => {
            return {
                statusFlag: 'failed',
                errors: error.response.data,
                status : error.response.status
            }
        });
    }
);