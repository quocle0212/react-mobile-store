import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        addInformation: (state, action) => {
            state.user = action.payload;
        },
        updateInformation: (state, action) => {
            if (state.user) { 
                state.user.customer.fullname = action.payload.fullname;
                state.user.customer.phone = action.payload.phone;
                state.user.customer.address = action.payload.address;
            }
        },
        updateToken: (state, action) =>{
            state.user.accessToken = action.payload.accessToken;
        },
        resetInformation: (state) => {
            state.user = null;
        },
    },
});

export const { addInformation, updateInformation, resetInformation, updateToken } = userReducer.actions;
export default userReducer.reducer;
