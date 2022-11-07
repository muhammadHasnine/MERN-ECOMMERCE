import React from 'react';
import logo from '../../images/logo.png';
import {TreeView,TreeItem} from '@mui/lab';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from 'react-router-dom';
import './Sidebar.css'
const Sidebar = () => {
  return (
    <div className='sidebar bg-[rgb(255_255_255)] flex flex-col p-16'>
      <Link className='p-0 ' to='/'>
        <img className='w-[240px] m-auto md:w-full transition-all duration-[0.5s] hover:drop-shadow-[0_0_10px_tomato]' src={logo} alt="Ecommerce Logo" />
      </Link>
      <Link className='text-[#00000056] font-extralight text-4xl md:text-base font-roboto p-6 transition-all duration-[0.5s] hover:text-[tomato] hover:scale-[1.1]' to='/admin/dashboard'>
        <p>
          <DashboardIcon/> Dashboard 
        </p>
      </Link>
      <a className='text-[#00000056] font-extralight text-4xl md:text-base font-roboto p-6 transition-all duration-[0.5s] hover:text-[tomato] hover:scale-[1.1]'>
        <TreeView
        defaultCollapseIcon={<ExpandMoreIcon/>}
        defaultExpandIcon={<ImportExportIcon/>}
        >
          <TreeItem nodeId='1'  label="Products">
              <Link  to='/admin/products'>
                  <TreeItem nodeId='2'  label="All" icon={<PostAddIcon/>}/>
              </Link>
              <Link to='/admin/product'>
                  <TreeItem nodeId='3' label="Create" icon={<AddIcon/>}/>
              </Link>
              <Link to='/admin/product/category'>
                  <TreeItem nodeId='4' label="Category" icon={<AddIcon/>}/>
              </Link>
          </TreeItem>
        </TreeView>
        </a>
        <Link className='text-[#00000056] font-extralight text-4xl md:text-base font-roboto p-6 transition-all duration-[0.5s] hover:text-[tomato] hover:scale-[1.1]' to='/admin/orders'>
            <p>
              <ListAltIcon/>Orders
            </p>
        </Link>
        <Link className='text-[#00000056] font-extralight text-4xl md:text-base font-roboto p-6 transition-all duration-[0.5s] hover:text-[tomato] hover:scale-[1.1]' to='/admin/users'>
            <p>
                <PeopleIcon/>Users
            </p>
        </Link>
        <Link className='text-[#00000056] font-extralight text-4xl md:text-base font-roboto p-6 transition-all duration-[0.5s] hover:text-[tomato] hover:scale-[1.1]' to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  )
}

export default Sidebar