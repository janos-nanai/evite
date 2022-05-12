import { AppState } from "../types/store-types";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../components/UI/Card";
import { login } from "../store/auth-slice";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const Auth = () => {
  const [idInput, setIdInput] = useState("");
  const [passInput, setPassInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state: AppState) => state.auth);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const loginData = {
      voucherId: idInput,
      voucherPass: passInput,
    };

    dispatch(login(loginData));
  };

  useEffect(() => {
    if (authState.accessToken) {
      navigate("/home");
    }
  }, [authState.accessToken, navigate]);

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
      <React.Fragment>
        {authState.isLoading && <LoadingSpinner asOverLay />}

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
          <div className="u-mt-5">
            <button className="btn btn--light" type="submit">
              tovább
            </button>
          </div>

          {authState.error && (
            <div className="u-center-text u-warning-text">
              <span>{authState.error}</span>{" "}
            </div>
          )}
        </form>
      </React.Fragment>
    </Card>
  );
};

export default Auth;
