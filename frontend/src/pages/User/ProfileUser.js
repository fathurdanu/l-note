import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiPencil, BiLocationPlus } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/customerActions';
import url from '../../helpers/base_url';
import { FaBirthdayCake } from "react-icons/fa"
import { BsGenderAmbiguous } from "react-icons/bs"


const ProfileUser = () => {
  const { action, status, data } = useSelector(state => state.customerReducer)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser())
  }, []);
  return (
    (status === "data" && action === "GET_USER") ?
      (<div>
        <div className="grid md:grid-cols-12 grid-cols-1 text-lightColor mx-auto lg:w-8/12 w-11/12 gap-5">

          <div className="md:col-span-7 sm:col-span-12 flex justify-center items-center mb-10">
            <div className="">
              <div className="grid grid-cols-2">
                <div className="pt-10 pb-5 justify-end">
                  <button
                    className="flex bg-accentColor text-black bg-lightColor rounded p-2 hover:bg-midDarkColor hover:font-bold hover:text-lightColor"
                    onClick={() => navigate("/profile/edit")}
                  >
                    <BiPencil className="mt-1 mr-1" />
                    Edit

                  </button>
                </div>
              </div>

              <div>
                <img
                  className="object-cover h-[500px]"
                  src={data.image}
                  alt="Sunset in the mountains"
                />
              </div>
            </div>
          </div>

          <div className=" md:col-span-5 sm:col-span-12 py-5 mb-10">
            <h1 className="text-xl font-semibold pt-10 pb-5 text-center">
              User Description
            </h1>
            <div className="bg-midDarkColor h-[500px] p-5 rounded-md shadow-2xl shadow-black-600">
              <div>
                <p className="text-md pb-4 lg:text-5xl text-3xl">
                  @{data.username}
                </p>
              </div>
              <hr className="border-t-2 py-3" />
              <div className="grid grid-cols-2 h-[150px] gap-3 lg:mb-0 mb-7">
                <div className="text-xl bg-lightColor text-darkColor p-5">
                  <p className="font-bold pb-2 pr-5">
                    <FaBirthdayCake />
                  </p>
                  <p className="text-2xl">
                    {data.birthday.split('T')[0].split('-').reverse().join("-")}
                  </p>
                </div>
                <div className="bg-lightColor text-darkColor p-5">
                  <p className="text-xl font-bold pb-2 pr-5">
                    <BsGenderAmbiguous />
                  </p>
                  <p className="text-2xl">
                    {data.gender}
                  </p>
                </div>
              </div>
              <div className="mt-3 h-[150px] bg-lightColor text-darkColor p-5">
                <p className="text-xl font-bold pb-2 pr-5">
                  <AiOutlineMail />
                </p>
                <p className="text-2xl">
                  {data.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>) : status === "loading" ? "loading" : status === "error" ? data : String(data)
  );
};

export default ProfileUser;
