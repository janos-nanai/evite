import React, { ReactChild } from "react";
import MainNavigation from "./MainNavigation";

const Layout = (props: { children: ReactChild | ReactChild[] }) => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
