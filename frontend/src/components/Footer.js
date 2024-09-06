import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (

<div className="text-center border shadow-xl">
   <div className=" px-4 flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900">
         <Link to={"/"}>
          {" "}
            <h1 className="cursor-pointer text-[30px] font-extrabold">
             Crypto<span className="text-blue-700">Tracker</span>
          </h1>
       </Link>
       </div>
  <span className="block text-sm text-center text-gray-500">
    © 2024 myCrypto Tracker™. All Rights Reserved. 
  </span>
  <ul className="flex justify-center mt-5 space-x-5">
  <FaWhatsapp className="text-green-700 cursor-pointer" />

    
  <FaFacebook className="text-blue-700 cursor-pointer" /> 


  <FaGithub className="text-black cursor-pointer" /> 


  <FaYoutube className="text-red-700 cursor-pointer" />
    
  </ul>
</div>

  );
};

export default Footer;




