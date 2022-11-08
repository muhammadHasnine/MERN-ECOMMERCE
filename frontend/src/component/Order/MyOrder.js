import React, { Fragment, useEffect } from "react";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/layout/Loader/Loader";
import LaunchIcon from '@mui/icons-material/Launch'
import CancelIcon from '@mui/icons-material/Cancel'; 
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
const MyOrder = () => {
  const { error, loading, orders } = useSelector((state) => state.myOrders);
  const {user} = useSelector(state=>state.user)
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
           <MetaData title={`${user.name}--Orders`}/>
          {orders.length === 0 ? <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] max-w-full "><CancelIcon className="text-[tomato] !text-[10vmax]"/><p className="my-[2vmax]">Order is empty go to Cart</p> <Link to='/cart' className="bg-[#333333] text-white p-[12px_34px]">View Cart</Link> </div> : (<div className="h-[100vh] w-[100vw] max-w-full bg-[rgb(235_235_235)] fixed top-0 left-0">
            <div className="Order_container overflow-x-auto">
              <div className="orderBox w-[1024px] m-auto">
                <header className="flex bg-[tomato] text-white py-3 px-7 font-medium">
                  <p className="flex-[4]">Order ID</p>
                  <p className="flex-[2]">Status</p>
                  <p className="flex-[1] text-end">Items Qty</p>
                  <p className="flex-[2] text-end">Amount</p>
                  <p className="flex-[1] text-end">Action</p>
                </header>
                <div className="h-[70vh] overflow-auto">
                  {orders &&
                    orders.map((orderItem, i) => (
                      <div className="flex py-3 px-7 border-b border-b-[#5656568f] " key={i}>
                        <p className="flex-[4]">{orderItem._id}</p>
                        <p className={`flex-[2] ${orderItem.orderStatus === 'Processing' ? 'text-[red]' : 'text-[green]'}`}>{orderItem.orderStatus}</p>
                        <p className="flex-[1] text-end">{orderItem.orderItems.length}</p>
                        <p className="flex-[2] text-end"> ৳{orderItem.totalPrice}</p>
                       <p className="flex-[1] text-end"> <Link to={`/order/${orderItem._id}`}><LaunchIcon/></Link></p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <p className="fixed bottom-0 left-0 w-full bg-[#1b1b1b] text-white text-center py-3">{user.name}'s Orders</p>
          </div>) } 
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrder;
