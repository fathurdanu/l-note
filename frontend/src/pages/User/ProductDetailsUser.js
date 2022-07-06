import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import {
  BsCurrencyDollar,
  BsBasketFill,
  BsFillStarFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import DOMPurify from "dompurify";

import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/adminActions";
import {
  addToCart,
  getCartByUserId,
  addViews,
} from "../../actions/shoppingActions";

import intToRupiah from "../../helpers/rupiah";

import Swal from "sweetalert2";

import base_url from "../../helpers/base_url";

const ProductDetailsUser = () => {
  const { action, status, data } = useSelector((state) => state.adminReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);
  const url = base_url;

  useEffect(() => {
    dispatch(addViews(id));
    dispatch(getProductById(id));
  }, []);

  async function inputQty() {
    const { value: qty } = await Swal.fire({
      title: "Input the desired quantity",
      input: "number",
      inputLabel: "Product Quantity",
      inputPlaceholder: "Enter qty",
      confirmButtonColor: "#0B4619",
    });

    if (qty >= 1 && qty <= data.stock) {
      dispatch(
        addToCart({
          ProductId: id,
          qty: qty,
        })
      ).then(() => {
        dispatch(getCartByUserId());
      });
    } else if (qty < 1) {
      Swal.fire(
        "Add to Cart Error",
        "Quantity must be a positive integer!",
        "error"
      );
    } else if (qty > data.stock) {
      Swal.fire(
        "Add to Cart Error",
        "Quantity must not be higher than the Product Stock!",
        "error"
      );
    }
  }

  return (
    <div>
      <div className="text-center font-light text-lightColor text-5xl py-10 px-10">{data.name}</div>
      <div className="grid lg:grid-cols-12 grid-cols-1 text-lightColor gap-10">
        <div className="lg:col-span-5 items-center lg:justify-end justify-center flex">
          <div className="rounded-md bg-white w-[450px] p-5 text-darkColor">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {action === "GET_PRODUCT_BY_ID" && data !== "loading"
                ? data.ProductImages.map((img, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img src={img.filename}></img>
                    </SwiperSlide>
                  );
                })
                : "Loading"}
            </Swiper>
            <div className="px-6">
              <div className="text-left">
                <ul>
                  <li className="text-lg pb-2 inline">
                    <p className="inline">{"Category: "}</p>
                    <p className="inline font-bold">{data.category}</p>
                  </li>
                  <li>
                    <p className="inline">{"Condition: "}</p>
                    <p className="inline font-bold">{data.condition}</p>
                  </li>
                  <li>
                    <p className="inline">{"Stock: "}</p>
                    <p className="inline font-bold">{data.stock} unit</p>
                  </li>
                  <li>
                    <p className="inline">{"Weight: "}</p>
                    <p className="inline font-bold">{data.weight} kg</p>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  className="bg-darkColor text-lightColor p-2 font-semibold rounded-md"
                  onClick={() => inputQty()}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex items-center lg:justify-start justify-center">
          <div className="lg:w-9/12 w-[450px] border-lightColor p-5 rounded-md h-[600px] overflow-y-scroll no-scrollbar">
            <div className="">
              {/* <p className="pb-4 font-semibold text-2xl">{data.name}</p> */}
              <hr className="border-1 w-11/12 mx-auto" />


              <div className="grid grid-cols-3 p-3">
                <div>
                  <h1 className="text-md font-semibold">Rating</h1>
                  <div className="flex py-1 justify-center">
                    {data.rating !== 0 && data.rating !== null
                      ? [...Array(data.rating)].map((x, i) => (
                        <BsFillStarFill
                          key={i}
                          className="text-accentColor"
                          size={20}
                        />
                      ))
                      : "No ratings given"}
                  </div>
                </div>

                <div className="flex-row">
                  <h1 className="text-md font-semibold">Views</h1>
                  <h1 className="text-lg font-bold">{data.views}</h1>
                </div>
                <div className="flex-row">
                  <h1 className="text-md font-semibold">Total Sold</h1>
                  <h1 className="text-lg font-bold">{data.totalSold}</h1>
                </div>
              </div>
              <div className="pb-3">
                <p className="inline font-bold text-4xl">Rp{intToRupiah(data.price)}</p>
              </div>
              <hr className="border-1 w-11/12 mx-auto" />

              <p className="text-lg font-semibold pb-2">Description</p>
              <div className="mx-auto px-2">
                <p className="text-left truncate" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.desc) }}></p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsUser;
