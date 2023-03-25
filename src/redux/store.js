import { configureStore } from "@reduxjs/toolkit";
import productModalReducer from './slices/productModalSlice'
import cartItemsReducer from './slices/cartSlice'
import productReducer from './slices/productSlice'

export const store=configureStore({
    reducer:{
        productModal:productModalReducer,
        cartItems:cartItemsReducer,
        products:productReducer
    }
})