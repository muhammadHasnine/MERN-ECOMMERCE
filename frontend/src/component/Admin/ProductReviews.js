import React, { Fragment, useEffect, useState } from 'react';
import MetaData from '../layout/MetaData';
import {  useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import {useDispatch, useSelector} from 'react-redux';
import {getAllReviews,clearErrors,deleteReview} from '../../actions/productAction';
import { DataGrid } from '@mui/x-data-grid';
import {useToasts} from 'react-toast-notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from '@mui/material';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';
import Star from '@mui/icons-material/Star';
const ProductReviews = () => {
    const dispatch = useDispatch()
    const {addToast} = useToasts()
    const navigate = useNavigate()
    const {error,reviews,loading}= useSelector(state=>state.productReviews)
    const {error:deleteError,isDeleted} = useSelector(state=>state.review)
    const [productId, setProductId] = useState("")
    const deleteProductHandler = (reviewid) =>{
      dispatch(deleteReview(reviewid,productId))
    }
    const productReviewsSubmitHandler =(e)=>{
        e.preventDefault();
        dispatch(getAllReviews(productId));
    }
    useEffect(()=>{
      if(productId.length === 24){
        dispatch(getAllReviews(productId))
      }
      if(error){
        addToast(error,{appearance:"error"})
        dispatch(clearErrors());
      }
      if(deleteError){
        addToast(deleteError,{appearance:"error"})
        dispatch(clearErrors())
      }
      if(isDeleted){
        addToast("Review Deleted Successfully",{appearance:"success"})
        dispatch({type:DELETE_REVIEW_RESET})
      }
    },[dispatch,addToast,error,deleteError,navigate,isDeleted,productId])
    const columns =[
      {
        field:"id",
        headerName:"Review ID",
        minWidth:210,
        flex:0.5
      },
      {
        field:"user",
        headerName:"User",
        minWidth:250,
        flex:1.5
      },
      {
        field:"comment",
        headerName:"Comment",
        minWidth:320,
        flex:1.2
      },
      {
        field:"rating",
        headerName:"Rating",
        type:"number",
        minWidth:110,
        flex:0.2,
        cellClassName:(params)=>{
            return params.getValue(params.id,"rating") >= 3 ? "greenColor" : "redColor"
          }

      },
      {
        field:"actions",
        headerName:"Delete",
        type:"number",
        minWidth:110,
        flex:0.2,
        sortable:false,
        renderCell:(params)=>{
          return(
            <Fragment>
              <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}>
                <DeleteIcon/>
              </Button>
            </Fragment>
          )
        }

      }
    ]

    const rows = [];
    
    reviews && reviews.forEach((item)=>{
      rows.push({
        id:item._id,
        rating:item.rating,
        comment:item.comment,
        user:item.name
      })
    })
  return (
    <Fragment>
        <MetaData title='Product Reviews --- Admin'/>
        <div className="dashboard grid grid-cols-[1fr] md:grid-cols-[1fr_5fr] absolute max-w-full w-[100vw]">
            <Sidebar/>
            <div className="productListContainer bg-white md:border-l md:border-[#e6e6e6]">
            <form
            onSubmit={productReviewsSubmitHandler}
            className="reviewProductForm w-[60%] md:w-[24%] m-auto"
          >
            <h1 className='text-center text-3xl font-roboto font-medium my-8'>Search Review</h1>
            <div className='relative'>
              <Star className='absolute top-[10px] left-[5px]'/>
              <input
              className='border border-[#dad6d6] rounded p-[10px_12px_10px_32px] w-full outline-none'
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
                
            <Button
              className='!bg-[tomato] !text-white !my-3 w-full '
              id="reviewProductBtn"
              type="submit"
              disabled={loading ? true : false || productId === "" ? true : false}
            >
              Search
            </Button>
          </form>
                
          {
            reviews && reviews.length > 0 ? (<DataGrid className='md:w-[98%] md:m-auto' columns={columns} rows={rows} autoHeight pageSize={10}/>) : (<h1 className='text-center font-roboto font-medium text-lg my-2'>No Review Found</h1>)
          }
            </div>
        </div>
    
    </Fragment>
  )
}


export default ProductReviews