import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import EditIcon from '@mui/icons-material/Edit';
import MetaData from "../layout/MetaData";
const Profile = () => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={user.name}/>
          <div className="container  md:flex w-[100vw] h-[100vh] max-w-full md:justify-center md:items-center ">
            <div className="container_box m-[5vw_auto_0] md:m-0 flex flex-col md:flex-row w-[90vw] md:w-[70vw]">
              <div className="1 w-full md:w-[30%] grid place-items-center bg-gradient-to-r from-[#ee5b6f] to-[#f29064] md:rounded-l-lg">
                <img className="mt-4 w-[150px] h-[150px] rounded-full" src={user.avatar.url} alt={user.name} />
                <Link className="flex items-center my-4 bg-[#03a9f4] py-1 px-4 font-medium gap-2 text-white" to="/me/update"><p>Edit Profile</p><EditIcon/></Link>
              </div>
              <div className="2 w-full md:w-[70%] bg-[#f0f0f0e8] p-7 md:rounded-r-lg">
                <div className="my_profilePart1">
                  <h1 className="border-b border-[#cbc5c5] font-medium">My Profile</h1>
                  <div className="my_profile1_2 flex flex-col md:flex-row my-5">
                    <div className="name flex-grow">
                      <h1 className="mb-2 font-medium">Full Name</h1>
                      <h1 className="text-[#919aa3] font-medium">{user.name}</h1>
                    </div>
                    <div className="email flex-grow">
                      <h1 className="mb-2 font-medium">Email</h1>
                      <h1 className="text-[#919aa3] font-medium">{user.email}</h1>
                    </div>
                  </div>
                  <h4 className="mb-2 font-medium">Joined On</h4>
                  <p className="text-[#919aa3] font-medium">{String(user.createdAt).substr(0, 10)}</p>
                </div>
                <div className="orderAndPassword flex flex-col gap-[10px]  md:max-w-[70%] m-[10px_auto]">
                <Link className="bg-black text-white py-[5px] text-center " to="/orders">My Orders</Link>
                <Link className="bg-black text-white py-[5px] text-center " to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
