import React from "react";

import Invite from "../components/Invite/Invite";
import Hero from "../components/Hero/Hero";
import CTA from "../components/CTA/CTA";

const Home = () => {
  return (
    <React.Fragment>
      <Hero />
      <Invite />
      <CTA />
    </React.Fragment>
  );
};

export default Home;
