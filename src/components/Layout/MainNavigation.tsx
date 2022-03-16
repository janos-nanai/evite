import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header className="header">
      <NavLink to="/" className="header__title">
        NAVBAR
      </NavLink>
      <nav className="header__navbar">
        <NavLink to="/about" className="btn btn--dark">
          about
        </NavLink>
        <NavLink to="/auth" className="btn btn--dark">
          login
        </NavLink>
      </nav>
    </header>
  );
};

export default MainNavigation;
