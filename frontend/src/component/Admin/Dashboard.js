import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar.js' 
import {LineChart,Line , CartesianGrid, XAxis, YAxis, Legend, Tooltip} from 'recharts'
import { PieChart, Pie, Cell} from 'recharts';
import {useDispatch, useSelector} from 'react-redux';
import {getAdminProducts} from '../../actions/productAction'
import {allOrders} from '../../actions/orderAction';
import { allUsers } from '../../actions/userAction'
const Dashboard = () => {
  const dispatch = useDispatch()
  const {products} = useSelector(state=>state.products)
  const {totalAmount,totalOrders}= useSelector(state=>state.allOrders)
  const {users}= useSelector(state=>state.allUser)
  let outOfStock = 0;
  products && products.forEach((item)=>{
    if(item.Stock === 0){
      outOfStock += 1
    }
  })
  const data = [
    { name: "Inital Balance",Balance: 0},
    { name: "Maximum Balance", Balance: totalAmount},
  ];
  const data1 = [
    { name: "Out of Stock", stock: outOfStock},
    { name: "Stock", stock: products.length - outOfStock},
  ];
  const COLORS = ["#e00808", "#00C49F"];
  useEffect(()=>{
    dispatch(getAdminProducts())
    dispatch(allOrders());
    dispatch(allUsers())
  },[dispatch])
  return (
    <div className='dashboard grid grid-cols-[1fr] md:grid-cols-[1fr_5fr] absolute max-w-full w-[100vw]'>
      <MetaData title="Dashboard - Admin panel"/>
      <Sidebar/>
      <div className="dashbordContainer border-t md:border-t-0 md:border-l bg-[rgb(255_255_255)] py-12 px-0">
        <Typography className='text-[#0000009d] text-[2rem] font-roboto font-light text-center w-[50%] p-6' style={{margin:"auto",fontSize:"2rem"}} >Dashboard</Typography>
        <div className="dashboardSummery md:w-[90%] md:m-auto">
          <div className='flex justify-center bg-[#3e83ba] text-white'>
            <p className='text-center font-roboto font-medium'>Total Amount <br /> ৳{totalAmount && totalAmount}</p>
          </div>
          <div className="dashboardSummeryBox2 flex justify-center gap-4 my-4 mx-3 md:mx-0">
          <Link to='/admin/products' className='bg-[#e76666] h-32 w-32 flex flex-col justify-center items-center rounded-full text-white'>
            <p>Product</p>
            <p style={{fontSize:"24px"}}>{products && products.length}</p>
          </Link>
          <Link className='bg-[#2b2929] h-32 w-32 flex flex-col justify-center items-center rounded-full text-white' to='/admin/orders'>
            <p>Orders</p>
            <p style={{fontSize:"24px"}}>{totalOrders}</p>
          </Link>
          <Link className='bg-[#686fd3] h-32 w-32 flex flex-col justify-center items-center rounded-full text-white' to='/admin/users'>
            <p>Users</p>
            <p style={{fontSize:"24px"}}>{users && users.length}</p>
          </Link>
        </div>
        </div>
      <div className="lineCA w-fit my-3 mx-auto">
      <LineChart  width={600} height={300} data={data}>
      <Line type="monotone" dataKey="Balance" stroke="#2196F3" strokeWidth={3} />
     
      <CartesianGrid stroke="#ccc"/>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      </LineChart>
      </div>
      <div className="paiCa w-fit mx-auto">
      <PieChart width={800} height={400}>
      <Pie
        data={data1}
        cx={375}
        cy={200}
        innerRadius={40}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="stock"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
      </div>
      </div>
    </div>
  )
}

export default Dashboard