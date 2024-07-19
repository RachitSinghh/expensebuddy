import { configureStore } from "@reduxjs/toolkit";
import user from './slices/user'


export const store = configureStore({
    reducer:{
        user
    },
})

// slices just a combination of reducers and actions
