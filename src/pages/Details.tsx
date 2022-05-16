import React from "react";

import MainNavigation from "../components/Layout/MainNavigation";
import MainFooter from "../components/Layout/MainFooter";

const Details = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main>
        <h1 className="heading-primary">Details page</h1>
        <p className="paragraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          architecto ipsum ad quod, modi officiis necessitatibus distinctio amet
          provident illum ducimus. Eaque quidem cum velit aut sequi totam nulla
          molestiae?
        </p>
      </main>
      <MainFooter />
    </React.Fragment>
  );
};

export default Details;
