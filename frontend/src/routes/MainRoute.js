import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import CustomerRoute from "./CustomerRoute";
import CartButton from "../components/CartButton";
import { CheckoutPage } from "../pages/User";

import Login from "../pages/Login";
import { RegisterUser, OrderDetailsPage } from "../pages/User";
import { RegisterCMS } from "../pages/CMS";
import SideBarCMS from "../components/SideBarCMS";
const MainRoute = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
      {/* <Route path="/" element={<Navigate replace to="/main/home" />} /> */}
      {/* <Route path="/main*" element={<CustomerRoute />}></Route> */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<RegisterUser />}></Route>
      <Route path="admin/register" element={<RegisterCMS />}></Route>
      <Route path="admin/*" element={<SideBarCMS />}></Route>
      {/* <Route path="checkout/:id" element={<CheckoutPage />}></Route> */}
      <Route path="/*" element={<CartButton />}></Route>
      <Route path="orderDetail/:id" element={<OrderDetailsPage />}></Route>
    </Routes>
  );
};

export default MainRoute;
