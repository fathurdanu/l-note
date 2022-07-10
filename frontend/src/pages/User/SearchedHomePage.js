import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import CarouselComponent from "../../components/CarouselComponent";
import CardContainerUser from "../../components/CardContainerUser";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/adminActions";
import { FaSearch } from 'react-icons/fa'
import { dataToQuery } from '../../helpers/string_tools'

const SearchedHomePage = () => {
  const { action, status, data } = useSelector((state) => state.adminReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { query } = useParams();

  useEffect(() => {

    // query? dispatch(get)
    dispatch(getAllProducts());

  }, []);

  const [searchForm, setSearchForm] = useState("")

  const searchHandling = () => {
    let querySearch = searchForm !== "" ? dataToQuery(searchForm) : "all"
    navigate("/products/" + querySearch);
  }

  return (
    <div className="mx-auto md:container">
      {/* <div className="py-3">
        <CarouselComponent />
      </div> */}
      <div>
        <div className="w-full">
          <div className="flex justify-center items-center w-6/12 mx-auto rounded-md lg:h-[88px] px-1">
            <div className="grid grid-cols-12 gap-[5px] rounded-md w-full h-14">
              <input onChange={(e) => setSearchForm(e.target.value)} type="text" className="px-4 col-span-10 py-2 text-lg text-darkColor focus:border-darkColor rounded-md" placeholder="Search..." />
              <div className="grid grid-cols-1 col-span-2 gap-[5px] items-center lg:h-full h-[35px]">
                <button onClick={() => searchHandling()} className="flex items-center justify-center h-full bg-midColor text-lightColor text-3xl rounded-md hover:text-4xl">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div className="py-5 no-scrollbar">
        {action === "GET_ALL_PRODUCTS" &&
          status === "data" &&
          (query === "all") ? (
          <CardContainerUser
            data={data}
          />
        ) : action === "GET_ALL_PRODUCTS" && status === "data" && query !== "all" ? (
          <CardContainerUser
            data={data.filter((product) =>
              product.name.toLowerCase().match(query.toLowerCase().replace("-","|")) || product.category.toLowerCase().match(query.toLowerCase().replace("-","|")) || product.desc.toLowerCase().match(query.toLowerCase().replace("-","|"))
            )}
          />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default SearchedHomePage;
