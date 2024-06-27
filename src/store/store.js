import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
    reducer:{
        auth : authSlice,
        //we can create also for post to reduce fetching from appwrite.
    }
})

export default store;