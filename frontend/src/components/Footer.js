import React from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
} from "react-icons/ai";
import logo from "../assets/images/logo-light.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="text-lightColor">
      <div className=" bg-midDarkColor">
        <div className="container grid py-10 md:grid-cols-3 sm:grid-cols-1 mx-auto items-center">
          <div className="w-7/12 mb-10 mx-auto">
            <img className="mx-auto" src={logo} alt="logo" />
            {/* <div className="text-center lg:text-5xl md:text-3xl text-5xl font-bold">L-note</div> */}
          </div>
          <div className="w-8/12 mb-10 flex items-center mx-auto">
            <div className="text-left text-md"><p className="font-bold inline">L-note</p> is a website that sells laptops online. Established in 2022. Every day, we help organizations and people find suitable and powerful notebooks.</div>
          </div>
          <div className="justify-center text-2xl mb-10 flex items-center">
            <ul>
              <li className="text-3xl font-bold">L-note</li>
              <li><button onClick={() => navigate("/")}>Home</button></li>
              <li><button onClick={() => navigate("/products/all")}>Products</button></li>
              <li><button onClick={() => navigate("/orders")}>Orders</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-lightColor bg-darkColor sm:h-14 h-16" >
        <div className="container text-xl grid grid-cols-3">
          <div className="text-center">
            <p>@copyright 2022 L-note</p>
          </div>
          <div></div>
          <div className="flex justify-center items-center grid-cols-3 text-4xl space-x-1">
            <div className="">
              <AiFillInstagram />
            </div>
            <div className="">
              <AiFillFacebook />
            </div>
            <div className="">
              <AiFillTwitterSquare />
            </div>
            <div className="">
              <AiFillYoutube />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;