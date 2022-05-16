import React from "react";

import MainNavigation from "../components/Layout/MainNavigation";
import MainFooter from "../components/Layout/MainFooter";
import Invite from "../components/Invite/Invite";
import Hero from "../components/Hero/Hero";
import CTA from "../components/CTA/CTA";

const Home = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main>
        <Hero />
        <Invite />
        <CTA />
      </main>
      <MainFooter />
    </React.Fragment>
  );
};

export default Home;
