import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "./layout/MetaData";
const Search = () => {
  const navigate = useNavigate();
  const [keyword, setkeyword] = useState("");
  const searchSubmitHandler = (e) =>{
      e.preventDefault();
    if(keyword.trim()){
      navigate(`/products/${keyword}`)
    }else{
      navigate('/products')
    }
  }
  return (
    <Fragment>
      <MetaData title="Search --- Ecommerce"/>
      <form className="w-[100vw] h-[100vh] max-w-full fixed top-0 left-0 flex justify-center items-center bg-[#e7e7e7]" onSubmit={searchSubmitHandler}>
        <input
          className="w-6/12 h-[8%] p-[1vmax_2vmax] font-[cursive] bg-white shadow-[0_0_5px_#00000045] outline-none"
          type="text"
          placeholder="Search a product....."
          onChange={(e) => setkeyword(e.target.value)}
        />
        <input className="w-[10%] h-[8%] p-[1vmax_2vmax] font-roboto text-white bg-[tomato] transition-all ease-in duration-300 hover:bg-blue-500 " type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
