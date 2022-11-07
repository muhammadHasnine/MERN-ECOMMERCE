import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] max-w-full ">
      <ErrorIcon className="text-[tomato] !text-[10vmax]" />
      <p className="my-[2vmax] text-4xl">Page Not Found</p>
      <Link to="/" className="bg-[#333333] text-white p-[12px_34px]">
        Home
      </Link>
    </div>
  );
};
export default NotFound;
