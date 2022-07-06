import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import CardContainerCMS from "../../components/CardContainerCMS";
import ProductFilter from "../../components/ProductFilter";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/adminActions";

const CMSDashboard = () => {
  const { action, status, data } = useSelector((state) => state.adminReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [query, setQuery] = useState("");
  const [queryDone, setQueryDone] = useState(false);

  useEffect(() => {
    navigate(`/admin/dashboard/${query}`);
  }, [queryDone]);

  return (
    <div className="min-h-screen text-lightColor w-10/12 mx-auto pt-5">
      <div className="grid grid-cols-2 w-96 mx-auto">
        <div className="flex justify-center items-center">
          <img className="h-36 w-36 rounded-full object-cover" src={localStorage.getItem('image')} />
        </div>
        <div className="flex items-center">
          <h1 className="text-4xl font-bold py-3">Admin</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 py-2 items-center h-14">
        <h2 className="flex text-lg font-semibold py-2">
          Your Products
        </h2>
        <div className="flex h-9 w-full justify-end">
          <input
            className="rounded h-full px-2"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button
            className="ml-1 px-3 rounded bg-white text-darkColor hover:bg-midColor hover:text-white"
            onClick={() => setQueryDone(true)}
          >
            <FaSearch />
          </button>
        </div>
      </div>
      <hr />
      <div className="py-5">
        {action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <CardContainerCMS data={data} />
        ) : (
          "loading"
        )}
      </div>
      <div className="fixed right-20 bottom-8">
        <button onClick={() => navigate("/admin/add")}>
          <MdOutlineAddCircle size={80} className="text-lightColor" />
        </button>
      </div>
    </div>
  );
};

export default CMSDashboard;
