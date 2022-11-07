import React, { Fragment } from "react";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import {addItemsToCart,removeItemFromCart} from "../../actions/cartAction"
import {MdRemoveShoppingCart} from "react-icons/md" 
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData.js";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const increaseQuantity = (id,quantity,stock) =>{
    const newQty = quantity+1
    if(stock <= quantity){
      return;
    }
    dispatch(addItemsToCart(id,newQty
      ))
  }
  const dicreaseQuantity = (id,quantity) =>{
    const newQty = quantity-1
    if(1 >= quantity){
      return;
    }
    dispatch(addItemsToCart(id,newQty))
  } 
  const deleteCartItems = (id) =>{
    dispatch(removeItemFromCart(id))
  }
  const checkOutHandler = () =>{
      navigate("/login?redirect=/shipping")
  }
  return (
    <Fragment>
      <MetaData title="Cart --- Ecommerce"/>
      {
        cartItems.length === 0 ? <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] max-w-full "><MdRemoveShoppingCart className="text-[tomato] text-[10vmax]"/><p className="my-[2vmax]">No Product in Your Cart</p> <Link to='/products' className="bg-[#333333] text-white p-[12px_34px]">View Products</Link> </div> : (<Fragment>

          <div className="cartPage">
            <div className="cartHade grid grid-cols-[3fr_1fr_1fr] py-3 bg-[tomato] text-white md:w-[90%] md:m-[6vmax_auto_0]">
              <p className=" pl-[6vmax] md:text-start md:pl-5">Product</p>
              <p className="md:text-center">Quantity</p>
              <p className="text-end md:text-center pr-2 md:pr-0">Subtotal</p>
            </div>
            {cartItems.map((item,i) => (
              <div className="cartContainer grid grid-cols-[3fr_1fr_1fr] md:w-[90%] md:m-auto" key={i}>
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <div className="cartInput flex h-7 mt-[3vmax] md:mt-[2vmax] md:justify-center">
                  <button className="bg-[black] text-white px-[1vmax]" onClick={()=>dicreaseQuantity(item.product,item.quantity)}>-</button>
                  <input
                    className="w-[4vmax] text-center outline-none text-[1.8vmax] md:text-[0.8vmax]"
                    type="number"
                    readOnly
                    value={item.quantity}
                  />
                  <button
                    className="bg-[black] text-white px-[0.7vmax]"
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.stock)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="mt-[3vmax] md:mt-[2vmax] text-center">{`৳${
                  item.price * item.quantity
                }`}</div>
              </div>
            ))}
            <div className="cartGrosseProfit grid grid-cols-[0_2fr] md:grid-cols-[2fr_1.2fr]  w-[90%] m-auto">
              <div></div>
              <div className="cartGrosseProfitBox flex justify-between border-t-[3px] border-t-[tomato] mt-7 py-5">
                <p className="text-xl font-medium font-roboto">Grosse Total</p>
                <p> ৳{cartItems.reduce((acc,item)=> acc + item.price * item.quantity,0)}</p>
              </div>
              <div></div>
              <div className="checkOutBtn bg-[tomato] text-white md:w-fit md:justify-self-end p-[1.5vmax_10vmax] md:p-[0.5vmax_10vmax]   rounded-3xl font-medium mt-10 text-center">
                <button onClick={checkOutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>)
      }
    </Fragment>
  );
};

export default Cart;
