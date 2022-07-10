import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { update, getProductById } from "../../actions/adminActions";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react'

import base_url from "../../helpers/base_url";

function EditProduct() {
  const { action, status, data } = useSelector((state) => state.adminReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: 0,
    stock: 0,
    brand: "",
    weight: 0,
    category: "",
    condition: "",
  });

  useEffect(() => {
    if (action === "GET_PRODUCT_BY_ID" && status === "data") {
      setForm({
        name: data.name,
        desc: data.desc,
        price: data.price,
        brand: data.brand,
        stock: data.stock,
        weight: data.weight,
        category: data.category,
        condition: data.condition,
      });
    }
    // else if (action === "UPDATE" && status === "data") {
    //   dispatch(getUser());
    // }
  }, [data, dispatch]);

  useEffect(() => {
    if (action === "UPDATE" && status === "data") {
      navigate(`/admin/details/${id}`);
    }
  });

  const editProductHandler = () => {
    dispatch(update(form, id));
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  return (
    <div className="mx-auto lg:w-10/12 md:w-4/5 w-11/12 bg-white rounded-md min-h-screen py-5 my-10">
      <div className="p-5">
        <div className="py-4 text-5xl font-bold text-darkColor text-center">
          Edit Product
        </div>
        <hr className="border-green-800 mx-5" />
        <div className="px-5 py-5">
          <div className="overflow-x-auto justify-center flex space-x-8">
            {data.ProductImages !== undefined ? (
              data.ProductImages.map((img, index) => {
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 my-5 w-36 h-36 bg-gray-100 shadow-gray-600 shadow-md text-gray-500 p-2 rounded-md"
                  >
                    <div className="text-7xl">
                      <img
                        className="w-32 h-32 object-cover"
                        src={
                          img
                            ? img.filename
                            : "https://www.w3schools.com/howto/img_avatar.png"
                        }
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-12 grid-cols-1">
          <div className="px-5 md:col-span-8 col-span-1">
            <div className="px-5 py-2">
              <label className="block text-darkColor text-lg font-bold pb-2">
                Description
              </label>
              <CKEditor
                data={form.desc}
                className="min-h-screen"
                editor={ClassicEditor}
                onChange={(e, editor) => { setForm({ ...form, desc: editor.getData() }) }}
              />
            </div>
          </div>
          <div className="px-5 md:col-span-4 col-span-1">
            <div className="px-5 py-2">
              <label className="block text-darkColor text-lg font-bold pb-2">
                Name
              </label>
              <input
                value={form.name}
                type="text"
                className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              ></input>
            </div>

            <div className="px-5 py-2">
              <label className="block text-darkColor text-lg font-bold pb-2">
                Price
              </label>
              <input
                value={form.price}
                type="number"
                min="0"
                maxLength="1000000000"
                className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              ></input>
            </div>
            <div className="px-5 py-2">
              <label className="block text-darkColor text-lg font-bold pb-2">
                Stock
              </label>
              <input
                value={form.stock}
                type="number"
                min="0"
                className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              ></input>
            </div>
            <div className="px-5 py-2">
              <label className="block text-darkColor text-lg font-bold pb-2">
                Brand
              </label>
              <input
                value={form.brand}
                type="text"
                className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
              ></input>
            </div>
            <div className="px-5 py-2">
              <label className="block text-darkColor text-lg font-bold pb-2">
                Weight
              </label>
              <input
                value={form.weight}
                type="number"
                min="0"
                className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
              ></input>
            </div>
            <div className="px-5 py-2">
              <label className="block text-darkColor text-lg font-bold pb-2">
                Category
              </label>
              <select
                value={form.category}
                className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
                name="category"
                id="category"
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="business">Business</option>
                <option value="artist">Artist</option>
                <option value="gaming">Gaming</option>
                <option value="school">School</option>
              </select>
            </div>
            <div className="px-5 py-2">
              <label className="block text-darkColor text-lg font-bold pb-2">
                Condition
              </label>
              <select
                value={form.condition}
                className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
                name="condition"
                id="condition"
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
              >
                <option value="new">New</option>
                <option value="second">Second</option>
              </select>
            </div>
          </div>


        </div>
        <div className="px-5 py-5">
          <button
            className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-md w-full"
            name="condition"
            id="condition"
            onClick={() => {
              editProductHandler();
              // navigate("/cms/dashboard");
            }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
