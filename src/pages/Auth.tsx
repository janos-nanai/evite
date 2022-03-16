import React from "react";

import Card from "../components/UI/Card";

const Auth = () => {
  return (
    <Card title="LOGIN">
      <form action="submit">
        <div>
          <label htmlFor="name">name</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" id="password" />
        </div>
        <button type="submit" className="btn btn--light">
          letsgo
        </button>
      </form>
    </Card>
  );
};

export default Auth;
