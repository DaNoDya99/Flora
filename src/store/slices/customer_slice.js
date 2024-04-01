import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../api/api';

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        data : {
            loggedIn: !!localStorage.getItem('user'),
            localStorage: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            role : 'customer'
        }
    },
    reducers: {
        login(state) {
            state.data.loggedIn = true;
        },
        logout(state) {
            state.data.loggedIn = false;
        },

    },
    extraReducers: (builder) =>  {
        builder.addCase(login2.fulfilled, (state, action) => {
            state.data.loggedIn = true;
            state.data.user = action.payload.customer;
            localStorage.setItem('user', JSON.stringify(action.payload.customer));

            window.location.href = '/';
        })
    }
});

export const {login, logout} = customerSlice.actions;
export default customerSlice.reducer;

export const register = createAsyncThunk(
    'customer/register',
    async (formData) => {
        return api.post('/customers/register', formData).then(response => {
            // console.log(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    });

export const login2 = createAsyncThunk(
    'customer/login',
    async (formData) => {
        return api.post('/customers/login', formData).then(response => {
            // console.log(response.data);
            return response.data;
        }).catch(error => {
            console.log(error);
        });
    });