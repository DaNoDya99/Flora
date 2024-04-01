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
            role : 'customer',
            errors: {},
            message: ''
        }
    },
    reducers: {
        login(state) {
            state.data.loggedIn = true;
        },
        logout(state) {
            state.data.localStorage = {};
            localStorage.removeItem('user');
            state.data.errors = {};
            state.data.user = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            };

            window.location.href = '/auth/login';
        },

    },
    extraReducers: (builder) =>  {
        builder.addCase(login2.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.loggedIn = true;
                state.data.localStorage = action.payload.customer;
                localStorage.setItem('user', JSON.stringify(action.payload.customer));

                window.location.href = '/';
            } else {
                action.payload.errors.message = action.payload.errors.message.replace(/"/g, '');
                state.data.errors = action.payload.errors;
            }
        }).addCase(register.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.localStorage = action.payload.customer;
                state.data.message = action.payload.message;
                state.data.errors = {};
            } else {
                action.payload.errors.message = formatString(action.payload.errors.message.replace(/"/g, ''));
                state.data.errors = action.payload.errors;
            }
        });
    }
});

export const {login, logout} = customerSlice.actions;
export default customerSlice.reducer;

export const register = createAsyncThunk(
    'customer/register',
    async (formData) => {
        return api.post('/customers/register', formData).then(response => {
            return {
                customer : response.data.customer,
                status: response.status,
                statusFlag: 'success',
                message: response.data.message
            
            };
        }).catch(error => {
            return {
                status: error.response.status,
                errors: error.response.data,
                statusFlag: 'failed'
            };
        });
    });

export const login2 = createAsyncThunk(
    'customer/login',
    async (formData) => {
        return api.post('/customers/login', formData).then(response => {
            // console.log(response.data);
            return {
                customer : response.data.customer,
                status: response.status,
                statusFlag: 'success',
                message: response.data.message
            }
        }).catch(error => {
            return {
                status: error.response.status,
                errors: error.response.data,
                statusFlag: 'failed'
            };
        });
    });
