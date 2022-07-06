import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import AdminRoute from "../routes/AdminRoute";
import Swal from "sweetalert2";
import Footer from "../components/Footer"
import AdminNavbar from "../components/AdminNavbar"

function SideBarCMS() {
  const [showDashboard, setShowDashboard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") && localStorage.getItem("type") === "customer") {
      navigate('/customer');
    } else if (!localStorage.getItem("access_token") || localStorage.getItem("type") !== "admin") {
      navigate('/login')
    }
  }, []);

  return (
    <div className="">
      <aside
        className={`flex border-r border-lightColor transform top-0 left-0 w-auto fixed h-screen ease-in-out transition-all duration-300 z-[3] -translate-x-20 hover:translate-x-0`}
      >
        <div className="bg-darkColor">

          <div className="mx-auto h-full">
            <ul className="my-2 h-3/6 flex items-center">
              <div>
                <hr className="border-1 border-lightColor" />
                <li>
                  <button
                    className="flex items-center h-20 w-20 px-1 text-lightColor bg-darkColor hover:bg-lightColor hover:text-darkColor"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    <p className="text-center w-full">Products</p>
                  </button>
                </li>
                <hr className="border-1 border-lightColor" />
                <li>
                  <button
                    className="flex items-center h-20 w-20 px-1 text-lightColor bg-darkColor hover:bg-lightColor hover:text-darkColor"
                    onClick={() => navigate("/admin/profile")}
                  >
                    {/* <CgProfile size={25} /> */}
                    <p className="text-center w-full">Profile</p>
                  </button>
                </li>
                <hr className="border-1 border-lightColor" />
                <li className="w-full absolute bottom-0">
                  <hr className="border-1 border-lightColor" />
                  <button
                    className="flex items-center h-20 w-20 px-1 text-lightColor bg-darkColor hover:bg-lightColor hover:text-darkColor"
                    onClick={() => {
                      localStorage.clear();
                      Swal.fire("Logout Success!", "See you later!", "success");
                      navigate("/login");
                    }}
                  >
                    <p className="text-center w-full">Logout</p>
                  </button>
                </li>
              </div>

            </ul>

          </div>


        </div>
      </aside>
      <main className="mx-auto w-full">
        <AdminNavbar/>
        <div className="mx-auto">
          <AdminRoute />
        </div>
        <Footer/>
      </main>
    </div>
  );
}

export default SideBarCMS;