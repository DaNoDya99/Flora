import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../api/api';
import all from '../../utils/functions.js';

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
            errors: {
                login: {},
                register: {},
                update: {},
                resetPassword: {}
            },
            message: {
                login: '',
                register: '',
                update : '',
                resetPassword: ''
            }
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
                state.data.message.login = action.payload.message;
                state.data.errors.login = {};

                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                action.payload.errors.message = action.payload.errors.message.replace(/"/g, '');
                state.data.errors.login = action.payload.errors;
            }
        }).addCase(register.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.localStorage = action.payload.customer;
                state.data.message.register = action.payload.message;
                state.data.errors.register = {};

                setTimeout(() => {
                    window.location.href = 'login';
                },1500);
            } else {
                action.payload.errors.message = all.formatString(action.payload.errors.message.replace(/"/g, ''));
                state.data.errors.register = action.payload.errors;
            }
        }).addCase(updateCustomer.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.localStorage = action.payload.customer;
                state.data.message.update = action.payload.message;
                state.data.errors.update = {};
                localStorage.setItem('user', JSON.stringify(action.payload.customer));

                setTimeout(() => {
                    window.location.href = '/';
                },500);
            } else {
                action.payload.errors.message = all.formatString(action.payload.errors.message.replace(/"/g, ''));
                state.data.errors.update = action.payload.errors;
            }
        }).addCase(resetCustomerPassword.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.loggedIn = true;
                state.data.localStorage = action.payload.customer;
                localStorage.setItem('user', JSON.stringify(action.payload.customer));
                state.data.message.resetPassword = action.payload.message;
                state.data.errors.resetPassword = {};

                setTimeout(() => {
                    window.location.href = '/';
                },1500);
            } else {
                action.payload.errors.message = all.formatString(action.payload.errors.message.replace(/"/g, ''));
                state.data.errors.resetPassword = action.payload.errors;
            }
        })
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

export const updateCustomer = createAsyncThunk(
    'customer/update',
    async (formData) => {
        return api.put('/customers/update', formData).then(response => {
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

export const resetCustomerPassword = createAsyncThunk(
    'customer/resetPassword',
    async (formData) => {
        return api.put('/customers/reset-password', formData).then(response => {
            console.log(response.data);
            return {
                status: response.status,
                statusFlag: 'success',
                message: response.data.message,
                customer: response.data.customer
            }
        }).catch(error => {
            return {
                status: error.response.status,
                errors: error.response.data,
                statusFlag: 'failed'
            };
        });
    });
