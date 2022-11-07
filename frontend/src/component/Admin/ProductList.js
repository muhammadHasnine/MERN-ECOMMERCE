import React, { Fragment, useEffect} from 'react';
import MetaData from '../layout/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import {useDispatch, useSelector} from 'react-redux';
import {getAdminProducts,clearErrors,deleteProduct} from '../../actions/productAction';
import { DataGrid } from '@mui/x-data-grid';
import {useToasts} from 'react-toast-notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Button} from '@mui/material';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
const ProductList = () => {
    const dispatch = useDispatch()
    const {addToast} = useToasts()
    const navigate = useNavigate()
    const {error,products}= useSelector(state=>state.products)
    const {error:deleteError,isDeleted} = useSelector(state=>state.product)
    const deleteProductHandler = (id) =>{
      dispatch(deleteProduct(id))
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
        addToast("Product Deleted Successfully",{appearance:"success"})
        dispatch({type:DELETE_PRODUCT_RESET})
      }
        dispatch(getAdminProducts());
    },[dispatch,addToast,error,deleteError,navigate,isDeleted])
    const columns =[
      {
        field:"id",
        headerName:"Product ID",
        minWidth:210,
        flex:0.5
      },
      {
        field:"name",
        headerName:"Name",
        minWidth:250,
        flex:2
      },
      {
        field:"stock",
        headerName:"Stock",
        type:"number",
        minWidth:150,
        flex:0.3
      },
      {
        field:"price",
        headerName:"Price",
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
              <Link to={`/admin/product/${params.getValue(params.id,"id")}`}><EditIcon/></Link>
              <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}>
                <DeleteIcon/>
              </Button>
            </Fragment>
          )
        }

      }
    ]

    const rows = [];
    
    products && products.forEach((item)=>{
      rows.push({
        id:item._id,
        stock:item.Stock,
        price:item.price,
        name:item.name
      })
    })
  return (
    <Fragment>
        <MetaData title='All Products --- Admin'/>
        <div className="dashboard grid grid-cols-[1fr] md:grid-cols-[1fr_5fr] absolute max-w-full w-[100vw]">
            <Sidebar/>
            <div className="productListContainer bg-white md:border-l md:border-[#e6e6e6]">
                <h1 className='my-5 text-xl font-semibold text-center font-roboto' id='productListHeading'>ALL PRODUCTS</h1>
                <DataGrid className='md:w-[98%] md:m-auto' columns={columns} rows={rows} autoHeight pageSize={10}/>
            </div>
        </div>
    
    </Fragment>
  )
}

export default ProductList