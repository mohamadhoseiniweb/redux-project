import {createSlice} from '@reduxjs/toolkit'

const items = localStorage.getItem('cartItems')?
   JSON.parse(localStorage.getItem('cartItems')):[]


const initialState={items,isCartOpen:false}


export const cartItemSlice=createSlice({
    name:'cartItems',
    initialState,
    reducers:{
        toggleCart:(state,action)=>{
            state.isCartOpen=!state.isCartOpen
        },
        addItem:(state,action)=>{
            const newItem=action.payload
            console.log(newItem)
            const duplicate=findItem(state.items,newItem)
            if(duplicate.length>0){
               state.items=deleteItem(state.items,newItem)

               state.items=[
                ...state.items,
                {
                    ...newItem,
                    quantity:newItem.quantity+duplicate[0].quantity
                }
               ]
            }

            else{
                state.items=[
                    ...state.items,{...newItem}
                ]
            }

            localStorage.setItem('cartItems',JSON.stringify(state.items))
        },
        removeItem:(state,action)=>{
            const newItem=state.items.find(item=>item.productId===action.payload)
            state.items=deleteItem(state.items,newItem)
        }
    }
})


const findItem=(arr,item)=>
   arr.filter(e => e.productId===item.productId && e.colorId===item.colorId)


const deleteItem=(arr,item)=>
   arr.filter(e=>e.productId!==item.productId || e.colorId!==item.colorId)


export const {addItem,removeItem,toggleCart} = cartItemSlice.actions
export default cartItemSlice.reducer