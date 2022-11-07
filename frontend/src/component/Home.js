import React, { Fragment, useEffect } from 'react'
import {CgMouse} from 'react-icons/cg'
import MetaData from './layout/MetaData'
import ProductCard from './ProductCard'
import {useSelector,useDispatch} from 'react-redux'
import {getProduct,clearErrors} from '../actions/productAction'
import Loader from './layout/Loader/Loader'
import {useToasts} from 'react-toast-notifications'
const Home = () => {
  const dispatch = useDispatch()
  const {addToast} = useToasts()
  const {loading,products,error} = useSelector(state=>state.products)
  useEffect(()=>{
    if(error){
      addToast(error, { appearance: 'error' });
      dispatch(clearErrors())
    }
    dispatch(getProduct())
  },[dispatch,error,addToast])
  return (
    <Fragment>
      {loading ? <Loader/>:(<Fragment>
      <MetaData title="Ecommerce"/>
    <div className="clip-path h-[100vmin] text-center flex flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')] text-white after:content-[''] after:w-[100vw] after:h-[100vmin] after:bg-white after:absolute md:after:top-0 after:top-[1px] after:left-0 after:z-[5] after:max-w-full">
        <p className='text-[2.4vmax] md:text-[1.4vmax] font-roboto font-medium tracking-wide'>Welcome to Ecommerce</p>
            <h1 className='text-[2.5vmax] font-semibold my-[5vmax]'>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button className='bg-white border hidden  border-white mb-[5vmax] w-[9vmax] cursor-pointer text-black p-[1vmax] text-[1vmax] font-medium md:flex gap-1 justify-center items-center hover:bg-[#673ab700] hover:text-white transition-all ease-in duration-300'>
          
                Scroll <CgMouse />
              </button>
            </a>
    </div>
    <h1 className='text-[2.4vmax] md:text-[1.4vmax] border-b border-[#15151580] w-[24vmax] md:w-[20vmax] m-[5vmax_auto] text-center p-[1vmax] text-[#000000b3] font-roboto' >Featured Products</h1>
    <div id='container' className='flex w-[80vw] m-[2vmax_auto] justify-center flex-wrap max-w-full'>
      {
        products && products.map((product,i)=>(
            <ProductCard key={i} product={product} />
        ))
      }
    </div>
    </Fragment>)}
    
    </Fragment>
  )
}

export default Home