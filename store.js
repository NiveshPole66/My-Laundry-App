import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import productReducer from "./productReducer";
export default configureStore({
    reducer:{
        cart:CartReducer,
        product:productReducer
    }
})