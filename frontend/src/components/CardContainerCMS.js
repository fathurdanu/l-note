
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const CardContainerCMS = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  return (
    <div className="grid gap-3 py-5 xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
      {data.map((product,index) => {
        return (
          <button key={index} onClick={() => navigate(`/admin/details/${product.id}`)}>
            <Card product={product} />
          </button>
        );
      })}
    </div>
  );
};

export default CardContainerCMS;