import React from "react";

import EventDetails from "./EventDetails/EventDetails";

const Invite = () => {
  return (
    <section className="section-invite">
      <p>
        Kedves Családunk és Barátaink!
        <br />
        Szeretettel meghívunk, hogy velünk örüljetek, mikor összekötjük
        életünket.
      </p>
      <div className="u-mt-5">
        <EventDetails />
      </div>
    </section>
  );
};

export default Invite;
