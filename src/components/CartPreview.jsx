import React from "react";
import {useSelector,useDispatch} from 'react-redux'
import classNames from 'classnames'
import {removeItem} from '../redux/slices/cartSlice'
import { successMessage } from "../utils/notification";


const CartPreview = () => {
  const{items,isCartOpen}=useSelector((state)=>state.cartItems)
  const dispatch=useDispatch()


  const handleRemoveFromCart=(productId)=>{
     dispatch(removeItem(productId))
     successMessage('حذف از سبد خرید با موفقیت انجام شد')
  }

  return (
    <div className={classNames("cart-preview",{active:isCartOpen})}>
      {items.length != 0 ? (
        <>
          <div className="cart-items">
            {items.map((product) => {
              return (
                <div
                  className="flex items-center hover:bg-gray-100 px-2 py-5"
                  key={product.id}
                >
                  <div className="flex w-3/5">
                    <div className="w-20">
                      <img
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{product.name}</span>
                      <span className="w-4 h-4 rounded mt-1" style={{'backgroundColor':product.colorCode}}></span>
                    </div>
                  </div>
                  <span className="text-center font-semibold text-sm">
                    {product.quantity}
                  </span>
                  <span className="text-center w-2/5 font-semibold text-sm">
                    {product.quantity * product.price}
                  </span>
                  <a onClick={()=>handleRemoveFromCart(product.productId)} className="font-semibold cursor-pointer hover:text-red-500 text-gray-500 text-2xl">
                    ×
                  </a>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="mt-4">
          <img
            className="mx-auto"
            src="/images/empty-cart.svg"
            alt="سبد خالی"
          />
          <p className="text-xl text-center">سبد خرید شما خالی است</p>
        </div>
      )}
             <div className="bottom-0 absolute p-2 w-full text-center">
            <button className={classNames('p-3 rounded w-full font-bold bg-yellow-400 hover:text-gray-500',{disabled:items && items.length===0})} type="button">ثبت سفارش</button>
          </div>
    </div>
  );
};

export default CartPreview;
