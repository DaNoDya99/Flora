import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../api/api';
import all from '../../utils/functions.js';

const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState: {
        data : {
            subCategories: [],
            errors: {},
        }
    },
    reducers: {
        
    },
    extraReducers: (builder) =>  {
        builder.addCase(getSubCategories.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.subCategories = action.payload.subCategories;
                state.data.errors = {};
            } else {
                state.data.errors = action.payload.errors;
            }
        });
    }
});

export default subCategorySlice.reducer;

export const getSubCategories = createAsyncThunk(
    'subCategory/getSubCategories',
    async () => {
        return api.get('/sub-categories/get').then((response) => {
            console.log(response);
            return {
                statusFlag: 'success',
                subCategories: response.data.subCategories,
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