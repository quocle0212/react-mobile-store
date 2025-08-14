import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: [],
};

const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let isProductExits = false;
            state.items.map((item) => {
                if (item._id === action.payload._id) {
                    item.qty += Number(action.payload.qty);
                    isProductExits = true;
                }
                return item;
            });
            if(!isProductExits)  state.items.push(action.payload);
        },
        updateItemCart: (state, action) => {
            state.items.map((item) => {
                if (item._id === action.payload._id) {
                    item.qty = Number(action.payload.qty);
                }
                return item;
            });
        },
        deleteItemCart: (state, action) => {
            const newItem = state.items.filter((item)=>item._id !== action.payload._id);
            state.items = newItem;
        },
        resetCart: (state, action) => {
            state.items = []
        }
    },
});

export const { addToCart, updateItemCart, deleteItemCart, resetCart } = cartReducer.actions;
export default cartReducer.reducer;
