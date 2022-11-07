import React from "react";
import playStore from "../../images/playStore.png"
import appStore from "../../images/appStore.png"
const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row mt-[10vmax] justify-around items-center bg-[rgb(34_33_33)] text-white font-roboto p-8">
      <div className="md:w-[20%] text-center">
        <h4 className="font-semibold">DOWNLOAD OUR APP</h4>
        <p className="my-4">Download App for Android and IOS mobile phone</p>
        <div className="flex justify-center items-center md:flex-col">
          <img
            className="w-36 m-2 "
            src={playStore}
            alt="playstore"
          />
          <img className="w-36 m-2" src={appStore} alt="Appstore" />
        </div>
      </div>
      <div className="w-[60%] text-center">
        <h1 className="text-3xl  md:text-5xl text-[#eb4034] my-2 md:my-7">
          ECOMMERCE
        </h1>
        <p>High Quality is our first priority</p>

        <p className="my-2">Copyrights 2022 &copy; MuhammadHasnine</p>
      </div>
      <div className="flex flex-col w-[20%] text-center">
        <h4 className="text-xl font-semibold underline my-4">Follow Us</h4>
        <a
          className="hover:text-[#eb4034] transition-all ease-in duration-200"
          href="http://instagram.com/MuhammadHasnine"
        >
          Instagram
        </a>
        <a
          className="hover:text-[#eb4034] transition-all ease-in duration-200"
          href="http://youtube.com/6packprogramemr"
        >
          Youtube
        </a>
        <a
          className="hover:text-[#eb4034] transition-all ease-in duration-200"
          href="http://instagram.com/MuhammadHasnine"
        >
          Facebook
        </a>
      </div>
    </footer>
  );
};

export default Footer;
