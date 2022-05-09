import { ChangeEvent, FormEvent } from "react";

import React, { useEffect, useState } from "react";
import Card from "../components/UI/Card";

const Auth = () => {
  const [idInput, setIdInput] = useState("");
  const [passInput, setPassInput] = useState("");

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    console.log(idInput);
    console.log(passInput);
  };

  const idInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIdInput(event.target.value);
  };

  const passInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassInput(event.target.value);
  };

  useEffect(() => {
    const idRaw = /id=([^&]+)/.exec(window.location.search);
    const passRaw = /pass=([^&]+)/.exec(window.location.search);

    if (idRaw && idRaw[1]) {
      setIdInput(idRaw[1]);
    }

    if (passRaw && passRaw[1]) {
      setPassInput(passRaw[1]);
    }
  }, []);

  return (
    <Card title="belépés">
      <form className="form" action="submit" onSubmit={submitHandler}>
        <div className="form__input-container">
          <label className="form__label" htmlFor="id">
            azonosító
          </label>
          <input
            className="form__input"
            type="text"
            id="id"
            value={idInput}
            onChange={idInputChangeHandler}
          />
        </div>
        <div className="form__input-container">
          <label className="form__label" htmlFor="password">
            jelszó
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            value={passInput}
            onChange={passInputChangeHandler}
          />
        </div>
        <button className="btn btn--light" type="submit">
          tovább
        </button>
      </form>
    </Card>
  );
};

export default Auth;
