import { Button, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useToasts } from "react-toast-notifications";
import { clearErrors, getOrderDetails, updateOrder} from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstants";
const ProcessOrder = () => {
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const {error:updateError, isUpdated} = useSelector((state) => state.order);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [status, setStatus] = useState("")

  const processOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);
    dispatch(updateOrder(id,myForm))
  };

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error" });
      dispatch(clearErrors());
    }
    if(updateError){
      addToast(error, { appearance: "error" });
      dispatch(clearErrors());
    }
    if(isUpdated){
      addToast("Order Update Successfully",{appearance:"success"})
      dispatch({type:UPDATE_ORDERS_RESET})
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, addToast, error, id, updateError, isUpdated]);
  return (
    <Fragment>
      <MetaData title="Process Order --- Ecommerce" />
      <div className="dashboard grid grid-cols-[1fr] md:grid-cols-[1fr_5fr] absolute max-w-full w-[100vw]">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div className="confirmOrderPage" style={{
              display: order.orderStatus === "Delivered" ? "block" : "grid",
            }}>
              <div>
                <div className="confirmShippingArea border-t md:border-t-0">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox ">
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
                        {order.shippingInfo &&
                          `${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>
                        Paymet method:
                        <span className="text-base font-semibold">
                          
                          {order.paymentInfo && order.paymentInfo.paymentMethod}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        TrxID:
                        <span className="text-base font-semibold">
                          
                          {order.paymentInfo &&
                            order.paymentInfo.transaction_id}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          color:
                            order.paymentInfo && order.paymentInfo.paymentMethod
                              ? "green"
                              : "red",
                        }}
                      >
                        {order.paymentInfo && order.paymentInfo.paymentMethod
                          ? "PAID"
                          : "NOT PAID"}
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
                        style={{
                          color:
                            order.orderStatus === "Delivered"
                              ? "green"
                              : "red",
                        }}
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <span>
                            {item.quantity} X ৳{item.price} =
                            <b>৳{item.quantity * item.price}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
        {
          order.orderStatus !== "Delivered" && (      <div>
            <div className="orderSummery" style={{padding:"1vmax"}}>
              <form
                onSubmit={processOrderSubmitHandler}
                encType="multipart/form-data"
                className="createProductForm"
                style={{boxShadow:"unset"}}
              >
                <h1 className='pb-12'>Process Order</h1>
                <div className="pb-2">
          <AccountTreeIcon />
          <select  onChange={(e) => setStatus(e.target.value)}>
            <option value="">Choose Category</option>
            {order.orderStatus === "Processing" && <option value="Shipped">Shipped</option>}
            
           {order.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
          </select>
        </div>
        <Button

          id="createProductBtn"
          type="submit"
          disabled={loading ? true : false || status === "" ? true : false}
        >
          Process
        </Button>
              </form>
            </div>
          </div>)
        }
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
