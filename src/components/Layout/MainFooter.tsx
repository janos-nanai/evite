import React from "react";

import flowerBot from "../../assets/img/flowerbot.webp";

const MainFooter = () => {
  return (
    <footer className="footer">
      <img className="footer__img" src={flowerBot} alt="beautiful flowers" />
    </footer>
  );
};

export default MainFooter;
