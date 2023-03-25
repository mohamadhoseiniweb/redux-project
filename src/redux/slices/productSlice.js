import { createSlice } from '@reduxjs/toolkit'
import {getProductsAsync} from '../../services/productService'

const initialState={
    items:[],
    isLoading:false,
    error:null
}


// const reducer1 = createReducer(initialState, {
//     [getProductsAsync.fulfilled]: (state, action) => {},
//   })
  
// const reducer2 = createReducer(initialState, (builder) => {
//     builder.addCase(getProductsAsync.fulfilled, (state, action) => {})
// })


// export const productSlice=createSlice({
//     name:'products',
//     initialState,
//     extraReducers:(builder)=>{
//        builder.addCase(getProductsAsync.pending,(state,action)=>{
//           state.isLoading=true
//        })

//        builder.addCase(getProductsAsync.fulfilled,(state,action)=>{
//           state.items=action.payload
//           state.isLoading=false
//        })

//        builder.addCase(getProductsAsync.rejected,(state,action)=>{
//           state.isLoading=false
//           state.error = action.error.message
//        })
//     }
// })


export const productSlice=createSlice({
   name:'products',
   initialState,
   extraReducers:{
      [getProductsAsync.pending]:(state,action)=>{
         state.isLoading=true
      },

      [getProductsAsync.fulfilled]:(state,action)=>{
         state.items=action.payload
         state.isLoading=false
      },

      [getProductsAsync.rejected]:(state,action)=>{
         state.isLoading=false
         state.error = action.error.message
      }
   }
})


export default productSlice.reducer