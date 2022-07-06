import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/customerActions';
import Swal from 'sweetalert2'
import logo from '../assets/images/logo-light.png'

function Login() {
  const { action, status, data } = useSelector(state => state.customerReducer)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      if (localStorage.getItem("type") === "customer") {
        Swal.fire("Login Success!", "Welcome!", "success");
        navigate('/');
      } else if (localStorage.getItem("type") === "admin") {
        Swal.fire("Login Success!", "Logged in as Admin", "success");
        navigate('/admin/dashboard');
      }
    };
  }, [status]);

  const loginHandler = () => {
    console.log(form)
    dispatch(login(form));
  }

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="md:col-span-9 col-span-12  flex justify-center items-center">
        <div>
          <div className="py-4 text-7xl font-light text-lightColor text-center">
            Login to Your Account
          </div>
          <hr className="border-lightColor" />
          <div className="w-7/12 mx-auto">

            <div className="px-5 pt-10 pb-5">
              <input
                type="text"
                className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
                placeholder="Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              ></input>
            </div>
            <div className="px-5 pb-5">
              <input
                type="password"
                className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              ></input>
            </div>

            <div className="px-5 py-5">
              <button
                className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-3xl w-6/12 mx-auto"
                name="condition"
                id="condition"
                onClick={() => loginHandler()}
              >
                Login
              </button>

            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-3 col-span-12 bg-trueDark flex justify-center text-lightColor">
        <div>
          <div className="flex justify-center">
            <img className="w-full object-cover" src={logo} />

          </div>
          <hr className="pb-20" />
          <div className="p-5 space-y-5">
            <p className="text-7xl font-light">New Here?</p>
            <p className="px-24">Sign up and discover what type of laptops/netbooks you need.</p>
            <button
              className="font-bold bg-lightColor text-darkColor py-2 px-5 rounded-3xl text-2xl"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
          <div>
            <img className="h-[350px] object-cover" src="https://i.pinimg.com/originals/83/4b/dc/834bdc62616b124bf0d764b670763438.gif" />
          </div>
        </div>
      </div>
    </div>

    // <div className="flex justify-center items-center h-screen">
    //   <div className="lg:w-96 md:w-3/5 sm:w-96 bg-white rounded-md">
    //     <div className="p-5">
    //       <div className="py-4 text-5xl font-bold text-darkColor text-center">
    //         Login
    //       </div>
    //       <hr className="border-green-800 mx-5" />

    //       <div className="px-5 py-2">
    //         <label className="block text-darkColor text-lg font-bold pb-2">
    //           Email
    //         </label>
    //         <input
    //           type="text"
    //           className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
    //           onChange={(e) => setForm({ ...form, email: e.target.value })}
    //         ></input>
    //       </div>
    //       <div className="px-5 py-2">
    //         <label className="block text-darkColor text-lg font-bold pb-2">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
    //           onChange={(e) => setForm({ ...form, password: e.target.value })}
    //         ></input>
    //       </div>

    //       <div className="px-5 py-8">
    //         <button
    //           className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-md w-full"
    //           name="condition"
    //           id="condition"
    //           onClick={() => loginHandler()}
    //         >
    //           Login
    //         </button>

    //         <h1 className="text-md mt-2 text-center">
    //           Don't have an account? Register{" "}
    //           <button
    //             className="font-bold text-darkColor"
    //             onClick={() => navigate("/register")}
    //           >
    //             here!
    //           </button>
    //         </h1>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Login;
