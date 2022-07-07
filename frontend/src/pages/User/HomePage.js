import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import CarouselComponent from "../../components/CarouselComponent";
import Banner from "../../components/Banner"
import CardContainerUser from "../../components/CardContainerUser";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/adminActions";

const HomePage = () => {
  const { action, status, data } = useSelector((state) => state.adminReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("access_token") && localStorage.getItem("type") === "admin") {
      navigate('/admin/dashboard');
    } else if (!localStorage.getItem("access_token") || localStorage.getItem("type") !== "customer") {
      navigate('/login')
    }
    dispatch(getAllProducts());
  }, []);

  const searchHandling = (query) => {
    // let querySearch = dataToQuery(searchForm);
    // console.log(querySearch);
    navigate("/products/" + query);
  }

  return (
    <div className="mx-auto">
      <div className="">
        <Banner />
      </div>

      {/* <div className="bg-gradient-to-b from-whiteColor to-midLightColor h-[200px]">
      </div> */}

      <div className='w-full pb-10 bg-firstColor'>
        <div className="text-center font-light text-lightColor lg:text-8xl text-5xl py-20 px-10">Categories</div>
        <div className="mx-auto px-10">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mb-10">
            <button className="relative hover:opacity-100 opacity-90" onClick={() => searchHandling("school")}>
              <img className="object-cover w-full lg:h-[500px] h-[200px]" alt="laptops for schoolwork" src="https://ak.picdn.net/shutterstock/videos/1017180085/thumb/1.jpg" />
              <div className="absolute w-full lg:p-10 p-5 bottom-0 inset-x-0 text-white opacity-50 bg-stone-600 lg:text-5xl text-2xl font-light text-left leading-4">School</div>
            </button>
            <button className="relative hover:opacity-100 opacity-90" onClick={() => searchHandling("business")}>
              <img className="object-cover w-full lg:h-[500px] h-[200px]" alt="laptops for business" src="https://img.freepik.com/free-photo/happy-casual-beautiful-woman-working-laptop-talking-with-somebody-office_566707-1241.jpg" />
              <div className="absolute w-full lg:p-10 p-5 bottom-0 inset-x-0 text-white opacity-50 bg-stone-600 lg:text-5xl text-2xl font-light text-left leading-4">Business</div>
            </button>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
            <button className="relative hover:opacity-100 opacity-90" onClick={() => searchHandling("artist")}>
              <img className="object-cover w-full lg:h-[500px] h-[200px]" alt="laptops for artists" src="https://techpulse.be/wp-content/uploads/2022/02/thinkbook.png" />
              <div className="absolute w-full lg:p-10 p-5 bottom-0 inset-x-0 text-white opacity-50 bg-stone-600 lg:text-5xl text-2xl font-light text-left leading-4">Artist</div>
            </button>
            <button className="relative hover:opacity-100 opacity-90" onClick={() => searchHandling("gaming")}>
              <img className="object-cover w-full lg:h-[500px] h-[200px]" alt="laptops for gamers" src="https://pinusi.com/wp-content/uploads/2021/08/Ilustrasi-Orang-Bermain-Game.jpg" />
              <div className="absolute w-full lg:p-10 p-5 bottom-0 inset-x-0 text-white opacity-50 bg-stone-600 lg:text-5xl text-2xl font-light text-left leading-4">Gaming</div>
            </button>
          </div>
        </div>
      </div>

      {/* <div className=" h-[200px]">
      </div> */}

      {action === "GET_ALL_PRODUCTS" && status === "data" ? (
        <div className="pb-5 bg-secondColor">
          <div className="text-center font-light text-darkColor lg:text-8xl text-5xl pt-20 pb-10 px-10">Products</div>
          <CardContainerUser data={data.filter((product, index) => index < 5)} />
        </div>
      ) : (
        action === "GET_ALL_PRODUCTS" && status === "loading"
      ) ? "loading" : ""}
    </div>
  );
};

export default HomePage;
