import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  SearchedHomePage,
  EditProfile,
  ProfileUser,
  ProductDetailsUser,
  OrdersPage,
  FilteredOrdersPage,
} from "../pages/User";

function LoggedRoutes() {
  return (
    <Routes>
      <Route path="" element={<HomePage />}></Route>
      {/* <Route path="home" element={<HomePage />}></Route> */}
      <Route path="products">
        <Route path=":query" element={<SearchedHomePage />}></Route>
      </Route>

      <Route path="profile">
        <Route path="" element={<ProfileUser />}></Route>
        <Route path="edit" element={<EditProfile />}></Route>
      </Route>
      <Route path="details/:id" element={<ProductDetailsUser />}></Route>
      <Route path="orders">
        <Route path="" element={<OrdersPage />}></Route>
        <Route path=":query" element={<FilteredOrdersPage />}></Route>
      </Route>
    </Routes>
  );
}

export default LoggedRoutes;
