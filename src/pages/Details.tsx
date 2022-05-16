import React from "react";

import MainNavigation from "../components/Layout/MainNavigation";
import MainFooter from "../components/Layout/MainFooter";

const Details = () => {
  return (
    <React.Fragment>
      <MainNavigation />
      <main>
        <section className="details__section-timetable">
          <h2 className="details__sub-title">(Program)</h2>
          <div className="details__container">
            <div className="details__left">
              <span className="details__time">15:30</span>
              <span className="details__timetable-event">
                egyházi szertartás
              </span>

              <span className="details__time">16:15</span>
              <span className="details__timetable-event">
                fotó, csokor- és harisnyakötő dobás
              </span>
            </div>
            <div className="details__right">
              <span className="details__place">
                budapest-mátyásföldi szent józsef plébániatemplom
              </span>
              <span className="details__address">
                1165 budapest, paulheim józsef tér 1
              </span>
            </div>
          </div>
          <hr className="cta_line u-mt-5" />
          <div className="details__container u-mt-5">
            <div className="details__left">
              <span className="details__time">17:30</span>
              <span className="details__timetable-event">vendégfogadás</span>

              <span className="details__time">19:00</span>
              <span className="details__timetable-event">vacsora</span>

              <span className="details__time">21:00</span>
              <span className="details__timetable-event">nyitótánc</span>

              <span className="details__time">22:30</span>
              <span className="details__timetable-event">torta</span>

              <span className="details__time">00:00</span>
              <span className="details__timetable-event">menyecsketánc</span>
            </div>
            <div className="details__right">
              <span className="details__place">
                Erzsébetligeti Étterem és Rendezvényház
              </span>
              <span className="details__address">
                1165 budapest, diósy lajos utca 22/d
              </span>
            </div>
          </div>
        </section>
        <section className="details__section-gifts">
          <h2 className="details__sub-title">(Ajándékozás)</h2>
          <p className="paragraph details__gift-para">
            Aki nászunkra szép ajándékot adna,
            <br /> A reánk szánt összeget tegye borítékba, <br /> A legtöbbet
            ezzel segít nekünk, <br /> Támogatva közös életünk.
          </p>
        </section>
      </main>
      <MainFooter />
    </React.Fragment>
  );
};

export default Details;
