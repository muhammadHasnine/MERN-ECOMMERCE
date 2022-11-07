
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import "./LoginSingup.css";
import { MdMailOutline, MdLockOpen, MdFace } from "react-icons/md";
import {useSelector,useDispatch} from "react-redux"
import {clearErrors,login,register} from "../../actions/userAction"
import {useToasts} from "react-toast-notifications"
import Loader from "../layout/Loader/Loader"
import MetaData from "../layout/MetaData";
const LoginSingup = () => {
  
  const {loading,error,isAuthenticated} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const {addToast} = useToasts()
  const switcherTab = useRef(null);
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name:"",
    email:"",
    password:""
  })

  const {name,email,password} = user
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword));
    
  };
  const registerSubmit = (e) =>{
    e.preventDefault();
    const myForm = new FormData();
    
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("password",password);
    myForm.set("avatar",avatar);

    dispatch(register(myForm));
  }
  const registerDataChange = (e) =>{
    if(e.target.name === "avatar"){
      const reader = new FileReader()
      reader.onload = () =>{
        if(reader.readyState === 2){
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }else{
      setUser({...user,[e.target.name] : e.target.value})
    }
  }

  const redirect =location.search ? location.search.split("=")[1]:"/account"
  useEffect(()=>{
      if(error){
        addToast(error, { appearance: 'error' });
         dispatch(clearErrors())
        }
        if(isAuthenticated){
          navigate(redirect)
        }
  },[dispatch,error,isAuthenticated,navigate,addToast,redirect])
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
   <Fragment>
    {
      loading ? <Loader /> :(
        <Fragment>
          <MetaData title="Log in or Sign Up"/>
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <MdMailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <MdLockOpen />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forget Password ?</Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <MdFace />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  required
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <MdMailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
              <MdLockOpen />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={registerDataChange}
                />
              </div>
              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file"  name="avatar" accept="image/*" onChange={registerDataChange} />
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      </Fragment>
      )
    }
   </Fragment>
  );
};

export default LoginSingup;