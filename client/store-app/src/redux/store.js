import { configureStore } from "@reduxjs/toolkit";
import { artApi } from "./artApi";
import userReducer from './userDetails';
import { orderApi } from "./orderApi";
const store = configureStore({
  reducer: {
    [artApi.reducerPath]: artApi.reducer, // Adding RTK Query reducer
    [orderApi.reducerPath]: orderApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artApi.middleware,orderApi.middleware), // Adding RTK Query middleware
});

export default store;
