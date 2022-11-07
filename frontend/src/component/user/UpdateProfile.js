import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdMailOutline, MdFace } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { useToasts } from "react-toast-notifications";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import "./UpdateProfile.css";
const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      addToast(error, { appearance: "error" });
      dispatch(clearErrors());
    }
    if (isUpdated) {
      addToast("Profile Updated Successfully", { appearance: "success" });
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, addToast, user]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <p className="updateProfileHeading">Update Profile</p>
              <form
              className="updateProfileForm"
              encType="multipart/form-data"
              onSubmit={updateProfileSubmit}
            >
              <div className="updateProfileName">
                <MdFace />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  required
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div className="updateProfileEmail">
                <MdMailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  required
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div id="updateProfileImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input type="file"  name="avatar" accept="image/*" onChange={(updateProfileDataChange)} />
              </div>
              <input type="submit" value="Update" className="updateProfileBtn" />
            </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
