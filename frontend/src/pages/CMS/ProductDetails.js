import React, { useEffect } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/adminActions";
import DOMPurify from 'dompurify';
import intToRupiah from "../../helpers/rupiah";

const ProductDetails = () => {
  const { action, status, data } = useSelector((state) => state.adminReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);


  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  return (
    <div>
      <div className="grid lg:grid-cols-12 grid-cols-1 text-lightColor min-h-screen gap-20">

        <div className="lg:col-span-5 items-center lg:justify-end justify-center flex">
          <div className="rounded-md bg-white w-[450px]">
            <div className="flex px-5">
              <div className="pt-10 pb-3">
                <button
                  className="flex bg-accentColor hover:text-black hover:bg-lightColor rounded px-2 py-1 bg-midDarkColor hover:font-bold text-lightColor"
                  onClick={() => navigate(`/admin/edit/${id}`)}
                >
                  <BiPencil className="mt-1 mr-1" />
                  Edit
                </button>
              </div>
            </div>

            <div className="lg:max-w-xl max-w-sm px-5 rounded overflow-hidden mx-auto">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
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
              <div className="p-6 text-left text-darkColor">
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
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex items-center lg:justify-start justify-center">
          <div className="lg:w-9/12 w-[450px] border-2 border-lightColor p-5 rounded-md">
            <div className="">
              <p className="pb-4 font-semibold text-2xl">{data.name}</p>
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

export default ProductDetails;
