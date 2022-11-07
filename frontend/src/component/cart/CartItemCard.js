import React from 'react'
import { Link } from 'react-router-dom'
const CartItemCard = ({item,deleteCartItems}) => {
  return (
    <div className='flex p-[3vmax] md:p-[1vmax] h-[25vmax] md:h-[8vmax] items-start'>
      <img className='w-[10vmax] md:w-[5vmax]' src={item.image} alt={item.name} />
      <div className='flex flex-col m-[1vmax_2vmax] md:m-[0.3vmax_1vmax]'>
        <Link className='text-[2vmax] md:text-[0.9vmax] font-medium' to={`/product/${item.product}`}>{item.name}</Link>
        <span className='text-[1.9vmax] md:text-[0.9vmax]'>{`Price: ৳${item.price}`}</span>
        <p className='text-[1.8vmax] md:text-[0.8vmax] text-[tomato] cursor-pointer' onClick={()=>deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  )
}

export default CartItemCard