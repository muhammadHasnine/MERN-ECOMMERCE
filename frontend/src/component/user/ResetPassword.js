import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, resetPassword} from "../../actions/userAction";
import { useToasts } from "react-toast-notifications";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import {MdLock,MdLockOpen} from "react-icons/md"
import "./ResetPassword.css"
const ResetPassword = () => {
    const {token} = useParams();
    const { error, loading, success } = useSelector((state) => state.forgotPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(token,myForm));
    };
   
    useEffect(() => {
      if (error) {
        addToast(error, { appearance: "error" });
        dispatch(clearErrors());
      }
      if (success) {
        addToast("Password Updated Successfully", { appearance: "success" });
        navigate("/login");
      }
    }, [dispatch, error, success, navigate, addToast]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Reset Password" />
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <p className="resetPasswordHeading">Reset Password</p>
            <form
            className="resetPasswordForm"
            onSubmit={resetPasswordSubmit}
          >
            <div>
                <MdLockOpen />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            <div>
                <MdLock />
                <input
                  type="password"
                  placeholder="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            <input type="submit" value="Update" className="resetPasswordBtn" />
          </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ResetPassword