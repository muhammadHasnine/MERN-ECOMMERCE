import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { userDetails, updateUser, clearErrors } from "../../actions/userAction";
import { useToasts } from "react-toast-notifications";
import { Button } from "@mui/material";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../component/layout/Loader/Loader";
const UpdateUser = () => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log("params",userId)
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { error:updateError, loading:updateLoading, isUpdated } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
console.log("redux",user._id)
  useEffect(() => {
    if(user && user._id !== userId){
      dispatch(userDetails(userId))
    }else{
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      addToast(error, { appearance: "error" });
      dispatch(clearErrors());
    }
    if (updateError) {
      addToast(updateError, { appearance: "error" });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      addToast("User Update Successfully", { appearance: "success" });
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, addToast, error, updateError, navigate, isUpdated, userId, user]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User --- Admin" />
      <div className="dashboard grid grid-cols-[1fr] md:grid-cols-[1fr_5fr] absolute max-w-full w-[100vw]">
        <Sidebar />
        <div className="newProductContainer">
         {
          loading ? <Loader /> : ( <form
            onSubmit={updateUserSubmitHandler}
            className="createProductForm"
          >
            <h1>Update User</h1>
            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <VerifiedUserIcon />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Category</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>        
            <Button
              id="createProductBtn"
              type="submit"
              disabled={updateLoading ? true : false || role === "" ? true : false}
            >
              Update
            </Button>
          </form>)
         }
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser