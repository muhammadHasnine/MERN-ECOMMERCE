import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {logOut} from "../../actions/userAction"
import { toast } from "react-toastify";
import { SpeedDial, SpeedDialAction } from  '@mui/material'
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
const UserOption = ({ user }) => {
  const {cartItems} = useSelector(state=>state.cart)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems && cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems && cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }


  function dashboard() {
    navigate("/admin/dashboard");
  }
  function account() {
    navigate("/account");
  }
  function cart() {
    navigate("/cart");
  }
  function orders() {
    navigate("/orders");
  }
  function logoutUser() {
    dispatch(logOut());
    toast.success("Log Out Successfully");
  }
  return (
    <Fragment>
          <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial fixed top-[3vmax] right-[3vmax]"
        icon={
          <img
            className="speedDialIcon w-[56px] h-[56px] rounded-full"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
      {/* <div
        onMouseLeave={() => setOpen(false)}
        className="container flex flex-col items-end gap-1 w-fit fixed top-[3vw] right-[3vw] z-10"
      >
        <div onClick={() => setOpen(!open)} className="image-line max-w-[25%]">
          <img className="w-[190px] h-[46px] rounded-[50%]" src={user.avatar.url} alt="" />
        </div>
        <ul
          className={`${
            open ? "opacity-[1]" : "opacity-0"
          } w-fit mr-[9px] transition-all ease-in duration-300`}
        >
          {options.map((item, i) => (
            <>
            <li
              key={i}
              className="bg-[#f5f5f5] mb-2 p-[0.4rem] rounded-full text-base shadow-[0px_1px_3px_1px_#7f7f7f4f]"
              onClick={item.func}
            >
              <p className="relative">{item.icon} <span className="absolute top-[-6px] right-[28px] bg-[#f5f5f5] p-[0.2rem_1rem] rounded-lg">{item.name}</span></p>
              
              
            </li>
            
            </>
          ))}
        </ul>
      </div> */}
    </Fragment>
  );
};

export default UserOption;
