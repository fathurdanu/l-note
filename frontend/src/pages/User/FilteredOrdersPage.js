import React, { useEffect } from "react";
import OrderTable from "../../components/OrderTable";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../actions/shoppingActions";

const FilteredOrdersPage = () => {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { query } = useParams();
  // console.log(query);

  useEffect(() => {
    dispatch(getOrdersByUserId());
  }, []);

  // useEffect(() => {
  //   console.log(action, "||", status, "||", data, "||");
  // }, [status]);

  return (
    <div className="py-3 text-lightColor">
      <div className="container mx-auto min-h-screen">
        <h1 className="font-semibold text-center text-5xl">Your Orders</h1>
        <div className="p-3">
          <div className="flex-wrap space-x-2 space-y-2 rounded w-full">
            <button
              className={`${query==="unpaid"? "hover:text-lightColor hover:bg-darkColor text-darkColor bg-lightColor": "hover:bg-lightColor hover:text-darkColor bg-darkColor text-lightColor"} w-40 p-2 text-lg rounded-md bg-darkColor text-lightColor font-semibold`}
              onClick={() => {
                query==="unpaid"? navigate("/orders"): navigate(`/orders/unpaid`);
              }}
            >
              Unpaid
            </button>

            <button
              className={`${query==="ready"? "hover:text-lightColor hover:bg-darkColor text-darkColor bg-lightColor": "hover:bg-lightColor hover:text-darkColor bg-darkColor text-lightColor"} w-40 p-2 text-lg rounded-md bg-darkColor text-lightColor font-semibold`}
              onClick={() => {
                query==="ready"? navigate("/orders"): navigate(`/orders/ready`);
              }}
            >
              Ready to Collect
            </button>

            <button
              className={`${query==="cancelled"? "hover:text-lightColor hover:bg-darkColor text-darkColor bg-lightColor": "hover:bg-lightColor hover:text-darkColor bg-darkColor text-lightColor"} w-40 p-2 text-lg rounded-md bg-darkColor text-lightColor font-semibold`}
              onClick={() => {
                query==="cancelled"? navigate("/orders"): navigate(`/orders/cancelled`);
              }}
            >
              Cancelled
            </button>
          </div>
        </div>
        <div className="p-5">
          {action === "GET_ORDERS_BY_USER_ID" && status === "data" ? (
            <OrderTable
              data={data.filter((order) => order.status.includes(query))}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredOrdersPage;
