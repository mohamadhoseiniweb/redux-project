import { axiosAPI } from "../lib/api"
import {createAsyncThunk} from "@reduxjs/toolkit";


export const getProductsAsync=createAsyncThunk('products/getProductsAsync',async()=>{
   const { data } = await axiosAPI("/os-products", "get", {
      populate: "*",
    });

    return data
})

export const getProductById= async (productId)=>{
     const {data} = await axiosAPI(`/os-products/${productId}`,'get',{
        populate:['image','colors.color']
     })

     return data;
}