import { configureStore } from "@reduxjs/toolkit";
import { artApi } from "./artApi";

const store = configureStore({
  reducer: {
    [artApi.reducerPath]: artApi.reducer, // Adding RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artApi.middleware), // Adding RTK Query middleware
});

export default store;
