import React from 'react'
import {Link} from 'react-router-dom'
import {Rating} from '@mui/material'
const ProductCard = ({product}) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className='w-[14vmax] flex flex-col no-underline text-[rgb(48_48_48) m-[2vmax] transition-all ease-in duration-300 pb-[1.5vmax] hover:shadow-[0px_0px_5px_rgb(15,15,15,0.26)] hover:translate-y-[-1vmax]' to={`/product/${product._id}`}>
      <img className='w-[14vmax]' src={product.images[0].url} alt={product.name} />
      <p className='font-roboto text-[1.7vmax] sm:text-[1.2vmax] mt-[1vmax] mx-[0.5vmax]'>{product.name}</p>
      <div className='m-[0vmax] sm:m-[0.5vmax] block sm:flex justify-start items-center'>
        <Rating {...options} style={{fontSize:"1rem"}} /> <span className='mx-[0.5vmax] sm:m-[0.5vmax] text-[1.5vmax] md:text-[1vmax] sm:text-[0.7vmax] font-light font-roboto'>({product.numOfReviews} Reviews)</span>
      </div>
      <span className='text-[1.5vmax] sm:text-[1vmax] m-[0.5vmax] text-[tomato] font-roboto'>{`৳ ${product.price}`}</span>
    </Link>
  )
}

export default ProductCard