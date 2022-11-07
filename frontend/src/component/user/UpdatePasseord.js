import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useToasts } from "react-toast-notifications";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import {MdLock,MdVpnKey,MdLockOpen} from "react-icons/md"
import "./UpdatePassword.css";
const UpdatePasseord = () => {
    const { error, loading, isUpdated } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();
  
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
        addToast(error, { appearance: "error" });
        dispatch(clearErrors());
      }
      if (isUpdated) {
        addToast("Password Updated Successfully", { appearance: "success" });
        navigate("/account");
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    }, [dispatch, error, isUpdated, navigate, addToast]);
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
                <MdVpnKey />
                <input
                  type="password"
                  placeholder="oldPassword"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            <div className="newPassword">
                <MdLockOpen />
                <input
                  type="password"
                  placeholder="newPassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            <div className="confirmPassword">
                <MdLock />
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