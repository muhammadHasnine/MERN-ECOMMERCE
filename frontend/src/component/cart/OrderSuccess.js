import React from 'react'
import CheckCircle from '@mui/icons-material/CheckCircle'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
const OrderSuccess = () => {
  return (
    <div className='h-[100vh] p-[10vmax] flex flex-col justify-center items-center'>
        <CheckCircle className='text-[tomato] mb-5' style={{fontSize:"100px"}}/>
        <Typography>Your Order has been Placed successfully </Typography>
        <Link className='bg-[#3d3b3b] py-2 px-7 my-8 text-white' to='/orders'>View Orders</Link>
    </div>
  )
}

export default OrderSuccess