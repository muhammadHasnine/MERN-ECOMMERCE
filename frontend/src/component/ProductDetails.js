import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails, newReview } from "../actions/productAction";
import { addItemsToCart } from "../actions/cartAction";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import ReviewCard from "./ReviewCard";
import Loader from "./layout/Loader/Loader"
import {clearErrors} from "../actions/productAction"
import MetaData from './layout/MetaData'
import {Dialog,DialogActions,DialogContent,DialogTitle,Button,Rating} from '@mui/material'
import { NEW_REVIEW_RESET } from "../constants/productConstants";
import { toast } from "react-toastify";
const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const {isAuthenticated} = useSelector(state=>state.user)
  const {error:reviewError,success} = useSelector(state=>state.newReview)
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const increaseQuantity = () =>{
    if(product.Stock <= quantity) return
    const qty = quantity + 1;
    setQuantity(qty)
  }
  const dicreaseQuantity = () =>{
    if(1>=quantity) return
    const qty = quantity - 1;
    setQuantity(qty)
  }

  const addToCartHandler = () =>{
    dispatch(addItemsToCart(id,quantity))
    toast.success("Item Added To Cart")
  }

  const submitReviewToggle = () =>{
    open ? setOpen(false) : setOpen(true)
  }
  const reviewSubmitHandler = () =>{
    
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment",comment);
    myForm.set("productID",id)

    dispatch(newReview(myForm))
    setOpen(false)
  }
  useEffect(() => {
    if(error){
        toast.error(error);
        dispatch(clearErrors())
    }
    if(reviewError){
      toast.error(reviewError);
      dispatch(clearErrors())
    }
    if(success){
      toast.success("Review Submitted Successfully");
      dispatch({type:NEW_REVIEW_RESET})
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id,error,success,reviewError]);
  return (
    <Fragment>
    {loading ? <Loader /> : (
      <Fragment>
        <MetaData title={`${product.name}--- Ecommerce`}/>
          <div className="w-[100vw] max-w-full  p-[6vmax] flex flex-col sm:flex-row box-border">
        <div className="flex flex-col w-full p-[2vmax] justify-evenly items-center box-border ">
         
       <div className="w-[22vmax]">
       <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, Navigation]}
             >
              {
                product.images && product.images.map((item,i)=>(
                  <SwiperSlide><img className='w-[100%]' src={item.url} key={item.url} alt={`${i} Slide`}/></SwiperSlide>
                ))
              }
              
             </Swiper>
       </div>
        </div>
        <div className="flex flex-col w-full p-[2vmax] justify-evenly items-center sm:items-start box-border ">
          <div>
            <h2 className="text-[rgb(54_54_54)] font-semibold text-center sm:text-start  text-[2.8vmax] sm:text-[1.6vmax] font-roboto">{product.name}</h2>
            <p className="text-[#000000a2] text-[1.7vmax] sm:text-[1.2vmax] font-extralight ">Product # {product._id}</p>
          </div>
          <div className="flex justify-center sm:justify-start items-center w-[90%] border-y border-y-[#0b0b0b4e] py-[1vmax]">
          <Rating {...options} />
            <span className="text-[#00000034] text-[1.5vmax] font-extralight ">({product.numOfReviews} Reviews)</span>
          </div>
          <div className="w-[70%] flex flex-col">
            <h1 className="text-[#111111c2] font-bold text-center sm:text-start sm:font-normal text-[3vamx] sm:text-[1.8vamx] my-[1vmax]">{`৳${product.price}`}</h1>
            <div className="flex flex-col sm:flex-row  items-center">
              <div className="py-[2vmax] sm:py-0 flex">
                <button className="cursor-pointer p-[1.2vmax] sm:p-[0.5vmax] w-[4vmax] sm:w-fit text-white transition-all duration-500 bg-[#0000009d] hover:bg-[#000000c2]" onClick={dicreaseQuantity}>-</button> 
                <input className="p-[1.5vmax_0] sm:p-[0.5vmax_0] w-[4vmax] sm:w-[2vmax] text-center outline-none font-normal text-[1.8vmax] sm:text-[0.8vmax] font-roboto text-[#000000bd]" type="number" value={quantity} readOnly onChange={(e)=>setQuantity(e.target.value)} />
                <button className="cursor-pointer  p-[1.2vmax] sm:p-[0.5vmax] w-[4vmax] sm:w-fit text-white transition-all duration-500 bg-[#0000009d] hover:bg-[#000000c2]"onClick={increaseQuantity}>+</button>
              </div>
              <button disabled={product.Stock < 1 ? true : false} className={`${product.Stock < 1 ? 'cursor-not-allowed' : 'cursor-pointer'} text-white transition-all duration-500 bg-[tomato] font-medium text-[1.7vmax] sm:text-[0.9vmax] font-roboto rounded-[20px] p-[1.5vmax] w-[20vmax] sm:w-fit  sm:p-[0.5vmax_2vmax] my-[3vmax] sm:m-[1vmax] outline-none hover:bg-[rgb(214_84_61)]`} onClick={addToCartHandler}>Add to Cart</button>
            </div>
            <p className="border-y border-y-[#0003] py-[2.5vmax] sm:py-[1vmax] text-center sm:text-start text-[#000000a6] font-normal text-[3vmax] sm:text-[1.5vmax] font-roboto my-[1vmax]">
              Status: 
              <b
                className={
                  product.Stock < 1 ? "text-red-500" : "text-green-400"
                }
              >
                {product.Stock < 1 ? " OutOfStock" : " InStock"}
              </b>
            </p>
          </div>
          <div className="text-[#000000e3] font-medium text-[2.2vmax] sm:text-[1.2vmax]">
            Discription: <p className="text-[#0000008c] font-light text-[1.8vmax] sm:text-[1vmax]">{product.description}</p>
          </div>
          {
            isAuthenticated && (<button className=" bg-[tomato] w-[20vmax] sm:w-fit text-[1.7vmax] sm:text-[0.7vmax] font-medium font-roboto rounded-[20px] p-[1.5vmax] sm:p-[0.6vmax_2vmax] my-[3vmax] sm:my-[1vmax] text-white cursor-pointer transition-all duration-500 outline-none hover:bg-[rgb(197_68_45)] hover:scale-[1.1]" onClick={submitReviewToggle}>Submit Review</button>)
          }
        </div>
      </div>
      <h1 className="text-black text-xl text-center border-b p-2 w-[20vmax] m-[0_auto_20px]">REVIEWS</h1>
      <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog flex flex-col">
            <Rating onChange={(e)=>setRating(e.target.value)} value={rating} size="medium"/>
            <textarea className='submitDialogTextArea border border-[#36363691] my-[1vmax] outline-none p-4 font-light text-base font-roboto' cols="30" rows="5" onChange={(e)=>setComment(e.target.value)} value={comment}>
            </textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
            <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
          </DialogActions>
      </Dialog>
      {
        product.reviews && product.reviews[0] ? (
          <div className="flex overflow-x-auto">
            {
              product.reviews && product.reviews.map((review)=>(
                <ReviewCard  review={review} />
              ))
            }
          </div>
        ) : (<p className="w-fit m-[0_auto] p-[2vmax] font-medium text-lg font-[cursive]">No Review yet</p>)
      }
      </Fragment>
    )}
    </Fragment>
  );
};

export default ProductDetails;
