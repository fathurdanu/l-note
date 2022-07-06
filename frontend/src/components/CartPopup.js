import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiFruitBowl } from "react-icons/gi";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import CustomerRoutes from "../routes/CustomerRoutes";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import {
    getCartByUserId,
    checkout,
    editLineItem,
    deleteLineItem,
} from "../actions/shoppingActions";
import { useDispatch, useSelector } from "react-redux";

function Popup({ setValue }) {

    const { action, status, data } = useSelector(
        (state) => state.shoppingReducer
    );
    const navigate = useNavigate();
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem("access_token")) navigate("/login");
        dispatch(getCartByUserId());
    }, []);

    useEffect(() => {
        if (action === "CHECKOUT" && status === "data")
            navigate("/orderDetail/" + data.id);
    }, [status]);

    async function editQty(id) {
        const { value: qty } = await Swal.fire({
            title: "Input the desired quantity",
            input: "number",
            inputLabel: "Update Quantity",
            inputPlaceholder: "Enter qty",
            confirmButtonColor: "#0B4619",
        });

        if (qty) {
            console.log(typeof id);
            console.log(typeof qty);
            dispatch(editLineItem(id, { qty: +qty })).then(() => {
                dispatch(getCartByUserId());
            });
        }
    }

    function deleteCartItem(id) {
        Swal.fire({
            title: "Are you sure you want to delete this item from Cart?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
            confirmButtonColor: "#0B4619",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(deleteLineItem(id)).then(() => {
                    dispatch(getCartByUserId());
                });
            }
        });
    }

    const checkoutHandling = () => {
        Swal.fire({
            title: "Are you sure want to checkout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(checkout()).then(() => setValue(false));
            }
        });
    };

    return (
        // <div className="flex justify-center items-center">
        <div id="crypto-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto fixed z-10 w-full flex justify-center items-center md:inset-0 h-modal">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative rounded-lg bg-midDarkColor shadow-darkColor shadow-2xl">
                    <div className="">
                        <button onClick={() => setValue(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="crypto-modal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                        {/* <!-- Modal header --> */}
                        <div className="py-4 px-6 rounded-t border-b dark:border-gray-600">
                            <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                                Cart
                            </h3>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-6">
                            {/* <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>
                            <ul className="my-4 space-y-3">
                                <li>
                                    <div className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                        <span className="flex-1 ml-3 whitespace-nowrap">MetaMask</span>
                                        <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                        <svg className="h-5" viewBox="0 0 292 292" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M145.7 291.66C226.146 291.66 291.36 226.446 291.36 146C291.36 65.5541 226.146 0.339844 145.7 0.339844C65.2542 0.339844 0.0400391 65.5541 0.0400391 146C0.0400391 226.446 65.2542 291.66 145.7 291.66Z" fill="#3259A5" /><path d="M195.94 155.5C191.49 179.08 170.8 196.91 145.93 196.91C117.81 196.91 95.0204 174.12 95.0204 146C95.0204 117.88 117.81 95.0897 145.93 95.0897C170.8 95.0897 191.49 112.93 195.94 136.5H247.31C242.52 84.7197 198.96 44.1797 145.93 44.1797C89.6904 44.1797 44.1104 89.7697 44.1104 146C44.1104 202.24 89.7004 247.82 145.93 247.82C198.96 247.82 242.52 207.28 247.31 155.5H195.94Z" fill="white" /></svg>
                                        <span className="flex-1 ml-3 whitespace-nowrap">Coinbase Wallet</span>
                                    </div>
                                </li>
                            </ul> */}


                            <ul className="my-2">
                                {action === "GET_CART_BY_USER_ID" &&
                                    status === "data" &&
                                    data !== "loading" ? (
                                    data.lineItems.map((lineItem, index) => {
                                        return (
                                            <div key={index}>
                                                <li className="my-2 flex">
                                                    <button className="flex items-center px-4 py-2 text-lightColor">
                                                        <GiFruitBowl size={25} />
                                                        <span className="mx-4 font-medium">
                                                            {lineItem.Product.name}
                                                        </span>
                                                        <span className="font-medium">{lineItem.qty}</span>
                                                    </button>

                                                    <button
                                                        className="mx-1 text-lightColor hover:text-accentColor"
                                                        onClick={() => editQty(lineItem.id)}
                                                    >
                                                        <BsPencilSquare />
                                                    </button>
                                                    <button
                                                        className="mx-3 text-lightColor hover:text-red-600"
                                                        onClick={() => deleteCartItem(lineItem.id)}
                                                    >
                                                        <BsFillTrashFill />
                                                    </button>
                                                </li>
                                                <hr className="border-t-
                                                
                                                
                                                border-lightColor"/>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </ul>

                            <div>
                                <div className="text-xs font-normal text-gray-500 dark:text-gray-400">
                                    {action === "GET_CART_BY_USER_ID" &&
                                        status === "data" &&
                                        data !== "loading" &&
                                        data.lineItems.length !== 0 ? (
                                        <li className="my-2 w-full flex justify-center mx-auto">
                                            <button
                                                className="flex bg-lightColor items-center px-4 py-2 text-darkColor hover:bg-white rounded-md"
                                                onClick={() => checkoutHandling()}
                                            >
                                                <span className="mx-4 font-medium">Checkout</span>
                                            </button>
                                        </li>
                                    ) : (
                                        <li className="my-2 w-full flex justify-center mx-auto">
                                            <div className="flex bg-lightColor items-left  py-2 text-darkColor rounded-md">
                                                <span className="mx-4 font-medium">
                                                    Your Cart is Still Empty!
                                                </span>
                                            </div>
                                        </li>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    )
}

export default Popup