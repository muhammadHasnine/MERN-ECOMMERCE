import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import {Typography} from '@mui/material'
import Loader from '../layout/Loader/Loader'
import {clearErrors,getOrderDetails} from '../../actions/orderAction'
import {useSelector,useDispatch} from 'react-redux'
import { useToasts } from "react-toast-notifications";
import './OrderDetails.css'
import { Link } from 'react-router-dom'
const OrderDetails = () => {
    const {loading,error,order} = useSelector(state=>state.orderDetails) 
    const {id} = useParams();
    const dispatch = useDispatch();
    const { addToast } = useToasts();
   useEffect(()=>{
    if(error){
      addToast(error,{appearance:"error"});
      dispatch(clearErrors())
    }
    dispatch(getOrderDetails(id))
   },[dispatch,error,addToast,id])
  return (
    <Fragment>
      {
        loading ? <Loader/> : (<Fragment>
          <MetaData title="Order Details" />
          <div className='orderDetailsPage'>
            <div className="orderDetailsContainer">
              <Typography>
                Order #{order && order._id}
              </Typography>
              <Typography>
                Shipping Info
              </Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {
                      order.shippingInfo && `${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`
                    }
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
              <div>
                <p>Paymet method: <span className='text-base font-semibold'> {
                    order.paymentInfo && order.paymentInfo.paymentMethod
                  }</span></p>
                </div>
                <div>
                <p>TrxID: <span className='text-base font-semibold'> {
                    order.paymentInfo && order.paymentInfo.transaction_id
                  }</span></p>
                </div>
                <div>
                  <p
                  style={{color:order.paymentInfo && order.paymentInfo.paymentMethod ? "green" : "red"}}
                  >
                    {
                      order.paymentInfo && order.paymentInfo.paymentMethod  ? "PAID" : "NOT PAID"
                    }

                  </p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span>৳{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                  style={{color:order.orderStatus === "Processing" ?"red":"green"}}
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems && order.orderItems.map((item)=>(
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ৳{item.price} = <b>৳{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fragment>)
      }
    </Fragment>
  )
}

export default OrderDetails