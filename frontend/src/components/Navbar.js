import React, { useState } from "react";
import logo from "../assets/images/logo-light.png"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-0 bg-darkColor">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <button
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-lightColor"
              onClick={() => navigate("/")}
            >
              <img className="h-[60px]" src={logo} />
            </button>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars">Menu
              </i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  onClick={() => {
                    navigate("/products/all");
                  }}
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Products</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Orders</span>
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">
                    <img className="w-7 h-7 object-cover rounded-full border border-lightColor" src={localStorage.image} />
                  </span>
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  onClick={() => {
                    localStorage.clear();
                    Swal.fire("Logout Success!", "See you later!", "success");
                    navigate("/login");
                  }}
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}