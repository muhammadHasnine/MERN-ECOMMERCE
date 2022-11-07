import { Button } from '@mui/material'
import React from 'react'
import MetaData from '../layout/MetaData' 
const Contact = () => {
  return (
    <div className='fixed w-[100vw] h-[100vh] bg-white max-w-full grid place-items-center '>
      <MetaData title="Contact Us"/>
      <a className='animate-[mailTrans_2s_forwards] translate-x-[-100vw] transition-all duration-300 ease-in-out ' href="mailto:mdhasninesheak@gmail.com">
      <Button className='!text-[2vmax] !p-3 !text-[black]'>
        Contact :  mdhasninesheak@gmail.com
      </Button>
      </a>
    </div>
  )
}

export default Contact