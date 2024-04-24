import {createAsyncThunk, createSlice}  from "@reduxjs/toolkit";
import {api} from "../../api/api";
import all from "../../utils/functions";

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        data: {
            employees: [],
        },
        message: {
            addEmployee: ''
        },
        errors: {
            addEmployee: {},
            updateEmployee: {},
            getEmployees: {}
        },
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addEmployee.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.message.addEmployee = action.payload.message;
                state.errors.addEmployee = {};
            } else {
                action.payload.errors.message = all.formatString(action.payload.errors.message.replace(/"/g, ''));
                state.errors.addEmployee = action.payload.errors;
            }
        }).addCase(getEmployees.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.employees = action.payload.employees;
            }else {
                state.errors.getEmployees = action.payload.errors;
            }
        }).addCase(updateEmployee.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.message.updateEmployee = action.payload.message;
                state.errors.updateEmployee = {};
            } else {
                action.payload.errors.message = all.formatString(action.payload.errors.message.replace(/"/g, ''));
                state.errors.updateEmployee = action.payload.errors;
            }
        }).addCase(getDeliveryPersonnel.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.employees = action.payload.employees;
            }else {
                state.errors.getEmployees = action.payload.errors;
            }
        }).addCase(getDeliveryPersonnelAssignedOrderCounts.fulfilled, (state, action) => {
            if (action.payload.statusFlag === 'success') {
                state.data.employees = action.payload.employees;
            }else {
                state.errors.getEmployees = action.payload.errors;
            }
        });
    }
});

export default employeeSlice.reducer;

export const addEmployee = createAsyncThunk(
    'employee/addEmployee',
    async (formData) => {
        // console.log(formData);
        return api.post('/employees/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return {
                employees: response.data.employee,
                status: response.data.status,
                message: response.data.message,
                statusFlag: 'success'
            };
        }).catch(error => {
            return {
                status: error.response.status,
                errors: error.response.data,
                statusFlag: 'failed'
            };
        });
    });

export const getEmployees = createAsyncThunk(
    'employee/getEmployees',
    async () => {
        return api.get('/employees/get-employees').then(response => {

            return {
                employees: response.data.employees,
                status: response.status,
                statusFlag: 'success'
            };
        }).catch(error => {
            return {
                status: error.response.status,
                statusFlag: 'failed'
            };
        });
    });

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async (formData) => {
        return api.put('/employees/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data);
            return {
                employees: response.data.employee,
                status: response.data.status,
                message: response.data.message,
                statusFlag: 'success'
            };
        }).catch(error => {
            console.log(error);
            return {
                status: error.response.status,
                errors: error.response.data,
                statusFlag: 'failed'
            };
        });
    });

export const getDeliveryPersonnel = createAsyncThunk(
    'employee/getDeliveryPersonnel',
    async () => {
        return api.get('/employees/get-delivery-personnel').then(response => {
            return {
                employees: response.data.employees,
                status: response.status,
                statusFlag: 'success'
            };
        }).catch(error => {
            return {
                status: error.response.status,
                statusFlag: 'failed'
            };
        });
    });

export const getDeliveryPersonnelAssignedOrderCounts = createAsyncThunk(
    'employee/getDeliveryPersonnelAssignedOrderCounts',
    async () => {
        return api.get('/employees/get-delivery-personnel-assigned-order-counts').then(response => {
            return {
                employees: response.data.employees,
                status: response.status,
                statusFlag: 'success'
            };
        }).catch(error => {
            return {
                status: error.response.status,
                statusFlag: 'failed'
            };
        });
    });
