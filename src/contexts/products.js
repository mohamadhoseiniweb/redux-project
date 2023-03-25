import { useReducer,createContext } from "react"
import { axiosAPI } from "../lib/api"


const initialState={
    products:null,
    isLoading:false,
    isLoaded:false
}


const reducer=(state,action)=>{
    switch(action.type){
        case "SEND_REQUEST_PRODUCTS":
          return{
             ...state,isLoading:true,isLoaded:false
          }

        case "GET_PRODUCTS_SUCCESS":
            return{
                ...state,isLoaded:true,isLoading:false,products:action.payload.products
            }

        case "GET_PRODUCTS_FAILURE" :
           return{
              ...state,isLoaded:true,isLoading:false,products:null
           }
        default :
          return state
    }
}


export const getProducts= async(dispatch)=>{
   dispatch({
    type:"SEND_REQUEST_PRODUCTS"
   })

   try {
    const { data } = await axiosAPI("/os-products", "get", {
      populate: "*",
    });
    
    dispatch({
        type:"GET_PRODUCTS_SUCCESS",
        payload:{products: data}
    })

  } catch (err) {
    console.log(err);
    dispatch({
        type:"GET_PRODUCTS_FAILURE"
    })
  }
}

export const ProductsStateContext=createContext();
export const ProductsDispatchContext=createContext();


const ProductsProvider=({children})=>{
    const[state,dispatch] = useReducer(reducer,initialState)
   
    return (
        <ProductsStateContext.Provider value={state}>
            <ProductsDispatchContext.Provider value={dispatch}>
               {children}
            </ProductsDispatchContext.Provider>
        </ProductsStateContext.Provider>
    )
}

export default ProductsProvider