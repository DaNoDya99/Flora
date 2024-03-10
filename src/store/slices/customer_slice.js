import {createSlice} from '@reduxjs/toolkit';

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        data : {
            loggedIn: false,
        }
    },
    reducers: {
        login(state) {
            state.data.loggedIn = true;
        },
        logout(state) {
            state.data.loggedIn = false;
        }
    }
});

export const {login, logout} = customerSlice.actions;
export default customerSlice.reducer;

