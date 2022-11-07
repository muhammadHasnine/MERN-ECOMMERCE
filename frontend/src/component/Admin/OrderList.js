import React, { Fragment, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors,allOrders,deleteOrder,} from '../../actions/orderAction';
import { DataGrid } from '@mui/x-data-grid';
import {useToasts} from 'react-toast-notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Button} from '@mui/material';
import { DELETE_ORDERS_RESET } from '../../constants/orderConstants';
import "./OrderList.css"
const OrderList = () => {
    const dispatch = useDispatch()
    const {addToast} = useToasts()
    const navigate = useNavigate()
    const {error,orders}= useSelector(state=>state.allOrders)
    const {error:deleteError,isDeleted} = useSelector(state=>state.order)
    const deleteOrderHandler = (id) =>{
      dispatch(deleteOrder(id))
    }

    useEffect(()=>{
      if(error){
        addToast(error,{appearance:"error"})
        dispatch(clearErrors());
      }
      if(deleteError){
        addToast(deleteError,{appearance:"error"})
        dispatch(clearErrors())
      }
      if(isDeleted){
        addToast("Order Deleted Successfully",{appearance:"success"})
        navigate("/admin/orders")
        dispatch({type:DELETE_ORDERS_RESET})
      }
        dispatch(allOrders());
    },[dispatch,addToast,error,deleteError,navigate,isDeleted])
    const columns =[
      {
        field:"id",
        headerName:"Order ID",
        minWidth:290,
        flex:0.5
      },
      {
        field:"status",
        headerName:"Status",
        minWidth:150,
        flex:2,
        cellClassName:(params)=>{
          return params.getValue(params.id,"status") === "Delivered" ? "greenColor" : "redColor"
        }
      },
      {
        field:"itemsQty",
        headerName:"Items Qty",
        type:"number",
        minWidth:150,
        flex:0.3
      },
      {
        field:"amount",
        headerName:"Amount",
        type:"number",
        minWidth:180,
        flex:0.5

      },
      {
        field:"actions",
        headerName:"Actions",
        type:"number",
        minWidth:150,
        flex:0.3,
        sortable:false,
        renderCell:(params)=>{
          return(
            <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
          )
        }

      }
    ]

    const rows = [];
    
    orders && orders.forEach((item)=>{
      rows.push({
        id:item._id,
        status:item.orderStatus,
        itemsQty:item.orderItems.length,
        amount:item.totalPrice
      })
    })
  return (
    <Fragment>
        <MetaData title='All Orders --- Admin'/>
        <div className="dashboard grid grid-cols-[1fr] md:grid-cols-[1fr_5fr] absolute max-w-full w-[100vw]">
            <Sidebar/>
            <div className="productListContainer bg-white md:border-l md:border-[#e6e6e6]">
                <h1 className='my-5 text-xl font-semibold text-center font-roboto' id='productListHeading'>ALL ORDERS</h1>
                <DataGrid className='md:w-[98%] md:m-auto' columns={columns} rows={rows} autoHeight pageSize={10}/>
            </div>
        </div>
    
    </Fragment>
  )
}


export default OrderList