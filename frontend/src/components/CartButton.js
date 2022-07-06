import React, { useState, useEffect } from 'react'
import CartPopup from './CartPopup';
import CustomerRoutes from '../routes/CustomerRoutes';
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'

function Cart() {
    const [cart, setCart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("access_token")) { navigate("/login") };
        // dispatch(getCartByUserId());
    }, []);

    const cartHandler = () => {
        setCart(!cart);
    }
    return (
        <div>
            <div className="">
                <Navbar />
                <div className="min-h-screen">
                    <CustomerRoutes />
                </div>
                <Footer />
            </div>


            <button
                onClick={() => cartHandler()}
                type="button"
                data-modal-toggle="crypto-modal"
                className="z-50 flex transform bottom-10 right-10 fixed focus:ring-4 focus:outline-none h-20 w-20 bg-lightColor text-darkColor text-3xl justify-center items-center rounded-full shadow-md shadow-darkColor">
                {/* <div className="border-4 border-darkColor rounded-full p-4"> */}
                    <FaShoppingCart />
                {/* </div> */}
            </button>

            {cart ? <CartPopup setValue={setCart} /> : ""}
        </div>
    )
}

export default Cart