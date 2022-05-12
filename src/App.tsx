import { AppState } from "./types/store-types";

import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { restoreAuthState } from "./store/auth-slice";
import Layout from "./components/Layout/MainLayout";
import Details from "./pages/Details";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

import { fetchOneById } from "./store/single-guest-slice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let localAuthData;
    const localAuthDataRaw = localStorage.getItem("localAuthData");
    if (localAuthDataRaw) {
      localAuthData = JSON.parse(localAuthDataRaw);
    }
    if (localAuthData) {
      dispatch(restoreAuthState(localAuthData));
    }
  }, [dispatch]);

  const { guestId, accessToken, refreshToken } = useSelector(
    (state: AppState) => state.auth
  );

  const isLoggedIn = !!((accessToken || refreshToken) && guestId);

  useEffect(() => {
    if (isLoggedIn) dispatch(fetchOneById(guestId));
  }, [dispatch, isLoggedIn, guestId]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/" element={<Auth />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
