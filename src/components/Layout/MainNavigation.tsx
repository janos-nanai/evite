import { AppState } from "../../types/store-types";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/auth-slice";

import flowerTop from "../../assets/img/flowertop.webp";

const NavMenu = (props: {
  toggled: boolean;
  closeHandler: () => void;
  logoutHandler: () => void;
}) => {
  return (
    <React.Fragment>
      {props.toggled && (
        <nav className="nav__menu u-drop-shadow">
          <NavLink
            className="btn btn__nav"
            to="/home"
            onClick={props.closeHandler}
          >
            kezdőlap
          </NavLink>
          <NavLink
            className="btn btn__nav"
            to="/details"
            onClick={props.closeHandler}
          >
            részletek
          </NavLink>
          <NavLink
            className="btn btn__nav"
            to="/guest-data"
            onClick={props.closeHandler}
          >
            adataid
          </NavLink>
          <NavLink
            className="btn btn__nav btn__nav--danger u-mt-2"
            to="/"
            onClick={props.logoutHandler}
          >
            kijelentkezés
          </NavLink>
        </nav>
      )}
    </React.Fragment>
  );
};

const MainNavigation = () => {
  const dispatch = useDispatch();

  const [navOpen, setNavOpen] = useState(false);

  const refreshToken = useSelector(
    (state: AppState) => state.auth.refreshToken
  );

  const closeHandler = () => {
    setNavOpen(false);
  };

  const logoutHandler = () => {
    dispatch(logout(refreshToken));
  };

  return (
    <React.Fragment>
      <header className="nav">
        <img className="nav__img" src={flowerTop} alt="beautiful flowers" />
        <div className="nav__burger u-z-front-above">
          <Hamburger color="#8DD9CC" toggled={navOpen} toggle={setNavOpen} />
        </div>
      </header>
      <NavMenu
        toggled={navOpen}
        closeHandler={closeHandler}
        logoutHandler={logoutHandler}
      />
    </React.Fragment>
  );
};

export default MainNavigation;
