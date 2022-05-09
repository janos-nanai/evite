import React, { ReactChild } from "react";
import MainFooter from "./MainFooter";
import MainNavigation from "./MainNavigation";

const Layout = (props: { children: ReactChild | ReactChild[] }) => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main>{props.children}</main>
      <MainFooter />
    </React.Fragment>
  );
};

export default Layout;
