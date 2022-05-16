import { AppState } from "../../../types/store-types";

import React, { useState, useCallback, useEffect, FormEvent } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateGuest } from "../../../store/single-guest-slice";
import { closeUpdateResponseModal } from "../../../store/ui-slice";
import Card from "../../UI/Card";
import FormRadio from "../FormRadio";

const UpdateResponse = () => {
  const [isComingInput, setIsComingInput] = useState(false);

  const dispatch = useDispatch();

  const currentIsComing = useSelector(
    (state: AppState) => state.singleGuest.data!.isComing
  );

  const _updateForm = useCallback(() => {
    setIsComingInput(currentIsComing);
  }, [currentIsComing]);

  const show = useSelector((state: AppState) => state.ui.showUpdateResponse);

  useEffect(() => {
    _updateForm();
  }, [_updateForm, show]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const updatedGuestData = {
      isComing: isComingInput,
    };

    dispatch(updateGuest(updatedGuestData));

    setIsComingInput(false);

    dispatch(closeUpdateResponseModal());
  };

  const closeHandler = () => {
    dispatch(closeUpdateResponseModal());
  };

  const yesHandler = () => {
    setIsComingInput(true);
  };

  const noHandler = () => {
    setIsComingInput(false);
  };

  return (
    <Card title="visszajelzésed" asOverlay onClose={closeHandler}>
      <form action="submit" onSubmit={submitHandler}>
        <fieldset className="form__fieldset">
          <legend className="form__legend">jössz?</legend>
          <FormRadio
            id="yes"
            name="coming"
            label="igen"
            changeHandler={yesHandler}
            checked={isComingInput}
          />
          <FormRadio
            id="no"
            name="coming"
            label="nem"
            changeHandler={noHandler}
            checked={!isComingInput}
          />
        </fieldset>
        <button className="btn btn--light cta__btn" formAction="submit">
          módosít
        </button>
      </form>
    </Card>
  );
};

export default UpdateResponse;
