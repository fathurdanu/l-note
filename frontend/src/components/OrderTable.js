import React from "react";
import { useNavigate, Link } from "react-router-dom";
import intToRupiah from "../helpers/rupiah";

const OrderTable = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  return (
    <div className="lg:w-10/12 w-full mx-auto">
      <div className="space-y-5">
        <div className="font-bold text-2xl cursor-pointer grid grid-cols-12">
          <p className="text-right md:table-cell p-2 col-span-1">No.</p>
          <p className="text-right md:table-cell p-2 col-span-3">Date</p>
          {/* <p className="md:visible invisible text-right">Price</p> */}
          <p className="text-right md:table-cell p-2 col-span-4">Total</p>
          <p className="text-right md:table-cell p-2 col-span-4">Status</p>
          {/* <th className="text-right">Order Status</th> */}
        </div>
      </div>
      <div className="space-y-2">
        {data
          ? data.map((order, index) => {
            return (
              <div
                className="border cursor-pointer grid grid-cols-12 h-20 p-4 rounded-md bg-lightColor text-darkColor lg:text-2xl text-md"
                key={index}
                onClick={() => navigate("/orderDetail/" + order.id)}
              >
                <div className="text-right md:table-cell col-span-1">
                  <p className="font-semibold">{index + 1}.</p>
                </div>
                <div className="text-right md:table-cell col-span-3">
                  <span className="font-semibold">
                    {String(order.createdAt).split('T')[0].split('-').reverse().join("-")}
                  </span>
                </div>
                {/* <td className="md:visible invisible text-right md:table-cell pb-3">
                    <span className="text-sm lg:text-base font-medium">
                    {`Rp${intToRupiah(+order.subtotal)}`}
                    </span>
                  </td> */}
                <div className="text-right md:table-cell col-span-4">
                  <span className=" font-semibold">
                    {`Rp${intToRupiah(+order.totalDue)}`}
                  </span>
                </div>
                {order.status !== null ? (
                  <div className="text-right md:table-cell col-span-4">
                    <span className="font-semibold ">
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <div className="text-right md:table-cell p-2 col-span-4">
                    <span className=" font-semibold ">
                      UNPAID
                    </span>
                  </div>
                )}
              </div>
            );
          })
          : console.log(data)}
      </div>

    </div>
  );
};

export default OrderTable;
