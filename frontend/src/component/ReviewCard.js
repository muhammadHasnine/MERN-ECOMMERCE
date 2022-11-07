import React from 'react'
import Profile from '../images/Profile.png'
import {Rating} from '@mui/lab'
const ReviewCard = ({review}) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <div className='shadow-[0_0_5px_#0000003a]  border border-[#0000001e] w-[30vmax] p-[3vmax] m-[1vmax] flex flex-col flex-none items-center'>
      <img className='w-[5vmax]' src={Profile} alt="User"/>
      <p className='font-semibold text-center'>{review.name}</p>
      <Rating {...options}/>
      {/* read more and read less implement .....  */}
      <span>{review.comment.substr(0,100)}</span>
    </div>
  )
}

export default ReviewCard