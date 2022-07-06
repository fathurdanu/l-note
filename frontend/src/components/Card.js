import React from "react";
// import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import intToRupiah from "../helpers/rupiah";
import base_url from "../helpers/base_url";
import { capitalize } from '../helpers/string_tools';

function Card(props) {
  // const [showOptions, setShowOptions] = useState(false);
  // const navigate = useNavigate();
  const data = props.product;
  return (
    <div>
      <div className="w-[260px] h-[380px] bg-white text-darkColor rounded-md shadow-sm shadow-neutral-500 hover:shadow-inner hover:inner cursor-pointer mx-auto">
        <p className="truncate font-bold pt-5 px-5">{data.name.toUpperCase()}</p>
        <p className="block">{data.category.split(' ').map(capitalize).join(' ')}</p>
        <img
          className="mx-auto w-48 h-48 rounded-t-md object-cover"
          alt=""
          src={data.ProductImages[0].filename}
        />
        <div className="p-2 ">
          <div className="pb-3">
            <p className="font-bold inline">Rp{intToRupiah(data.price)} </p>

          </div>
          <hr className="border-1 border-darkColor w-9/12 mx-auto pb-3" />
          <div className="flex justify-center">

            <div className="flex col-span-2">
              <p className="text-accentColor inline text-2xl">
                <AiFillStar />
              </p>
              <p className="inline">{data.rating}</p>
            </div>

            <div className="col-span-2 text-center px-5">|</div>

            <div className="col-span-2">
              <p className="inline">Terjual {data.totalSold}</p>
            </div>

            <div className="col-span-2 text-center px-5">|</div>

            <div><p className="inline"> {data.weight} kg</p></div>

          </div>
        </div>
        {/* <div className="mx-auto w-9/12">
          <p className="text-left truncate" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.desc) }}></p>
        </div> */}
      </div>
    </div>
  );
}

export default Card;
