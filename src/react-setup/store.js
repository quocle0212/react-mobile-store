import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cart';
import userReducer from './reducers/userInformation';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfigCart = {
    key: "cart",
    storage,
};

const persistConfigUser = {
    key: "userInformation",
    storage,
};

const persistCartReducer = persistReducer(persistConfigCart, cartReducer);
const persistUserReducer = persistReducer(persistConfigUser, userReducer);

const store = configureStore({
    reducer: {
        cart: persistCartReducer,
        userInformation: persistUserReducer,
    },
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //       serializableCheck: {
    //         // Ignore the paths related to redux-persist actions
    //         ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
    //       },
    //     }),
});
export const persistor = persistStore(store)
export default store;