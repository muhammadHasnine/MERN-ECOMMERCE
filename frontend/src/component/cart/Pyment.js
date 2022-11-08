import React, { Fragment , useState } from 'react';
import CheckoutSteps from '../cart/CheckoutSteps';
import MetaData from '../layout/MetaData';
import { Typography } from '@mui/material';
import { toast } from "react-toastify";
import './Payment.css'
import Mobile from '@mui/icons-material/SystemSecurityUpdate';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {createOrder} from '../../actions/orderAction'
const Pyment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
  const {shippingInfo,cartItems} = useSelector(state=>state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [radio, setRadio] = useState('')
  const [transId, setTransId] = useState('')
  const paymentInfo = {
    paymentMethod:radio,
    transaction_id:transId
  }
  const order = {
    shippingInfo,
    orderItems:cartItems,
    paymentInfo,
    itemsPrice:orderInfo.subtotal,
    taxPrice:orderInfo.tax,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice:orderInfo.totalPrice
  }
  const paymentGetways = ["Bkash","Rocket","Nagad"]
  const submitHandler = (e) =>{
    dispatch(createOrder(order))
    e.preventDefault();
    
    toast.success("Payment Successfully Done!");
    navigate("/success")
  }
  return (
    <Fragment>
        <MetaData title = "Payment Order --- Ecommerce" />
        <CheckoutSteps activeStep={2} />
        <div className="paymentContainer">
          <form className="paymentForm" onSubmit={(e) => submitHandler(e)}e>
            <Typography>Payment</Typography>
            <div>
              <p className='text-center'><Mobile/><span>Payment with your Personal account</span></p>
              <div className='flex justify-evenly items-center my-4'>
              {
                paymentGetways.map((item,i)=>(
                  <div key={i}>
                  <input  required type="radio" name='pay' value={item} onClick={(e)=>setRadio(e.target.value)} /><label>{item}</label>
                  </div>
                ))
              } 
             </div>
             {
              radio === "Bkash" && <div className='bg-[#f0407c] text-white text-center px-2 md:px-4 py-1 mb-2'><p>Bkash Payment Number:<span className='ml-2'>01854236596</span></p> </div>
             }
             {
              radio === "Rocket" && <div className='bg-[#af40f0] text-white text-center px-2 md:px-4 py-1 mb-2'><p>Rocket Payment Number:<span className='ml-2'>018542365969</span></p> </div>
             }
             {
              radio === "Nagad" && <div className='bg-[#e45138] text-white text-center px-2 md:px-4 py-1 mb-2'><p>Nagad Payment Number:<span className='ml-2'>01854236596</span></p> </div>
             }
             
            </div>
            <div>
              <p className='font-medium'>Transaction ID#</p>
              <input className='w-full bg-[#f5f5f5] outline-none my-4 p-3' type="text" required onChange={(e)=>setTransId(e.target.value)}/>
              
            </div>
            <input type="submit" value={`Pay - ৳${orderInfo && orderInfo.totalPrice}`} className='paymentFormBtn'/>
          </form>
        </div>
    </Fragment>
  )
}

export default Pyment