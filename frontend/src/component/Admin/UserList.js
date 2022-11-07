import React, { Fragment, useEffect} from 'react';
import MetaData from '../layout/MetaData';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import {useDispatch, useSelector} from 'react-redux';
import {allUsers,deleteUser,clearErrors} from '../../actions/userAction';
import { DataGrid } from '@mui/x-data-grid';
import {useToasts} from 'react-toast-notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Button} from '@mui/material';
import { DELETE_USER_RESET } from '../../constants/userConstants';
const UserList = () => {
    const dispatch = useDispatch()
    const {addToast} = useToasts()
    const navigate = useNavigate()
    const {users,error}= useSelector(state=>state.allUser)
    const {error:deleteError,isDeleted,message} = useSelector(state=>state.profile)
    const deleteUserHandler = (id) =>{
      dispatch(deleteUser(id))
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
        addToast(message,{appearance:"success"})
        navigate("/admin/users")
        dispatch({type:DELETE_USER_RESET})
      }
        dispatch(allUsers())
    },[dispatch,addToast,error,deleteError,navigate,isDeleted,message])
    const columns =[
      {
        field:"id",
        headerName:"User ID",
        minWidth:230,
        flex:1
      },
      {
        field:"email",
        headerName:"Email",
        minWidth:200,
        flex:1.5
      },
      {
        field:"name",
        headerName:"Name",
        minWidth:220,
        flex:1.3
      },
      {
        field:"role",
        headerName:"Role",
        minWidth:150,
        flex:0.5,
        cellClassName:(params)=>{
          return params.getValue(params.id,"role") === "admin" ? "greenColor" : "redColor"
        }

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
              <Link to={`/admin/user/${params.getValue(params.id,"id")}`}><EditIcon/></Link>
              <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}>
                <DeleteIcon/>
              </Button>
            </Fragment>
          )
        }

      }
    ]

    const rows = [];
    
    users && users.forEach((item)=>{
      rows.push({
        id:item._id,
        email:item.email,
        name:item.name,
        role:item.role
      })
    })
  return (
    <Fragment>
        <MetaData title='All Users --- Admin'/>
        <div className="dashboard grid grid-cols-[1fr] md:grid-cols-[1fr_5fr] absolute max-w-full w-[100vw]">
            <Sidebar/>
            <div className="productListContainer bg-white md:border-l md:border-[#e6e6e6]">
                <h1 className='my-5 text-xl font-semibold text-center font-roboto' id='productListHeading'>ALL USERS</h1>
                <DataGrid className='md:w-[98%] md:m-auto' columns={columns} rows={rows} autoHeight pageSize={10}/>
            </div>
        </div>
    
    </Fragment>
  )
}
export default UserList