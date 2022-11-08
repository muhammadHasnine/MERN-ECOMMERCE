import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { toast } from "react-toastify";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "./UpdatePassword.css";
const UpdatePasseord = () => {
    const { error, loading, isUpdated } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const updatePasswordSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();
  
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(updatePassword(myForm));
    };
   
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
      if (isUpdated) {
        toast.success("Password Updated Successfully");
        navigate("/account");
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    }, [dispatch, error, isUpdated, navigate]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Update Password" />
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <p className="updatePasswordHeading">Update Password</p>
            <form
            className="updatePasswordForm"
            onSubmit={updatePasswordSubmit}
          >
            <div className="oldPassword">
                <VpnKeyIcon />
                <input
                  type="password"
                  placeholder="oldPassword"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            <div className="newPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="newPassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            <div className="confirmPassword">
                <LockIcon />
                <input
                  type="password"
                  placeholder="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            <input type="submit" value="Update" className="updatePasswordBtn" />
          </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default UpdatePasseord