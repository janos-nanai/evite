import React from "react";

import Card from "../components/UI/Card";

const Auth = () => {
  return (
    <Card title="LOGIN">
      <form className="form" action="submit">
        <div className="form__input-container">
          <label className="form__label" htmlFor="name">name</label>
          <input className="form__input" type="text" id="name" />
        </div>
        <div className="form__input-container">
          <label className="form__label" htmlFor="password">password</label>
          <input className="form__input" type="password" id="password" />
        </div>
        <button className="btn btn--light" type="submit">
          letsgo
        </button>
      </form>
    </Card>
  );
};

export default Auth;
