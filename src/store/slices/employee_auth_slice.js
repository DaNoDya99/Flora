import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../api/api.js"
import all from "../../utils/functions.js"

const employeeAuthSlice = createSlice({
    name : "employeeAuth",
    initialState: {
        employee : {},
        loggedIn : !!localStorage.getItem('user'),
        localStorage : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
        role : '',
        errors : {
            login : {}
        },
        message : {
            login : ''
        }
    },
    reducers : {
        logout(state) {
            state.localStorage = {};
            localStorage.removeItem('user');
            state.errors = {};

            window.location.href = '/employee/login';
        },
    },
    extraReducers : (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.loggedIn = true;
                state.localStorage = action.payload.employee;
                localStorage.setItem('user', JSON.stringify(action.payload.employee));
                state.message.login = action.payload.message;
                state.errors.login = {};
                state.role = action.payload.employee.role;
                if(state.role === 'admin'){
                    setTimeout(() => {
                        window.location.href = '/admin/dashboard';
                    }, 1500);
                }else if(state.role === 'delivery'){
                    setTimeout(() => {
                        window.location.href = '/delivery/dashboard';
                    }, 1500);
                }
            } else {
                state.errors.login = action.payload.errors;
            }
        })
    }
})

export const {logout} = employeeAuthSlice.actions
export default employeeAuthSlice.reducer

export const login = createAsyncThunk(
    'employee/login',
    async (formData) => {
        return api.post('/employees/login', formData).then((response) => {
            console.log(response)
            return {
                statusFlag : "success",
                employee : response.data.employee,
                message : response.data.message,
                status : response.status
            }
        }).catch(error => {
            console.log(error.response)
            return {
                statusFlag : "failed",
                errors : error.response.data,
                status : error.response.status
            }
        })
    }
)

