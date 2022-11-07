import React from 'react'
import Github from '@mui/icons-material/GitHub'
import Facebook from '@mui/icons-material/Facebook'
const About = () => {
  return (
    <div className='fixed w-[100vw] h-[100vh] max-w-full bg-white grid grid-cols-2'>
      <div></div>
      <div className='bg-gradient-to-br from-[rgb(78_81_255)] to-[rgb(74_137_189)]'></div>
      <div className='absolute bg-white w-[90vw] md:w-[80vw] h-[auto] md:h-[80vh] shadow-[-6px_5px_14px_3px_#4c4c4c78] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col'>
        <h1 className='text-center my-4 text-[tomato] text-3xl font-roboto font-medium'>About Us</h1>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className="imag flex flex-col items-center p-5">
            <img className='my-2 md:my-5' src="https://res.cloudinary.com/dd77bcaju/image/upload/v1667743845/avatar/ixqinv0awh4druvu2amt.png" alt="avatar" />
            <p className='text-[13px]'>Muhammad Hasnine</p>
            <a className='my-2 md:my-5' href="#">VISIT GITHUB</a>
            <p className='w-[80%] text-center text-xs'>This is a sample wesbite made by @mdhasnine. Only with the purpose to understanding knowledge of the MERN Stack</p>
          </div>
          <div className="brands md:border-l border-[#dad8d8c9] flex flex-col items-center p-5">
            <h1 className='text-3xl font-roboto font-medium my-2 md:my-5 text-[#dad9d9]'>Our Brands</h1>
            <a  href="#">
              <Github className='!text-5xl'/>
            </a>
            <a href="#">
              <Facebook className='!text-5xl text-[#3156fa] mt-3'/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About