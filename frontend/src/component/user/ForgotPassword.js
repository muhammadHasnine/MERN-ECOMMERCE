import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useToasts } from "react-toast-notifications";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import {MdMailOutline} from "react-icons/md" 
import "./ForgotPassword.css"
const ForgotPassword = () => {
    const { error, loading, message } = useSelector((state) => state.forgotPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addToast } = useToasts();
  
    const [email, setEmail] = useState("")
  
    const forgotPasswordSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("email", email);
      dispatch(forgotPassword(myForm));
    };
   
    useEffect(() => {
      if (error) {
        addToast(error, { appearance: "error" });
        dispatch(clearErrors());
      }
      if (message) {
        addToast(message, { appearance: "success" });
       
      }
    }, [dispatch, error, message, navigate, addToast]);
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Forgot Password" />
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <p className="forgotPasswordHeading">Forgot Password</p>
            <form
            className="forgotPasswordForm"
            onSubmit={forgotPasswordSubmit}
          >
           <div>
                <MdMailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            <input type="submit" value="Update" className="forgotPasswordBtn" />
          </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ForgotPassword