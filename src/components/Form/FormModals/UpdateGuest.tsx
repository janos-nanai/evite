import { AppState } from "../../../types/store-types";
import { GuestDataUpdate } from "../../../types/guest-types";

import React, {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateGuest } from "../../../store/single-guest-slice";
import { closeUpdateGuestModal } from "../../../store/ui-slice";
import Card from "../../UI/Card";
import FormInput from "../FormInput";
import FormCheckbox from "../FormCheckbox";
import FormRadio from "../FormRadio";

const UpdateGuest = () => {
  const [lastNameInput, setLastNameInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [nickNameInput, setNickNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [isComingInput, setIsComingInput] = useState(false);
  const [foodGlutenFreeInput, setFoodGlutenFreeInput] = useState(false);
  const [foodLactoseFreeInput, setFoodLactoseFreeInput] = useState(false);
  const [foodDiabeticInput, setFoodDiabeticInput] = useState(false);

  const dispatch = useDispatch();

  const currentGuestData = useSelector(
    (state: AppState) => state.singleGuest.data!
  );

  const _updateForm = useCallback(() => {
    setFirstNameInput(currentGuestData.firstName);
    setLastNameInput(currentGuestData.lastName);
    setNickNameInput(currentGuestData.nickName);
    setEmailInput(currentGuestData.email);
    setPhoneInput(currentGuestData.phone);
    setIsComingInput(currentGuestData.isComing);
    // setDidReplyInput(currentGuestData.didReply);
    setFoodGlutenFreeInput(currentGuestData.foodGlutenFree);
    setFoodLactoseFreeInput(currentGuestData.foodLactoseFree);
    setFoodDiabeticInput(currentGuestData.foodDiabetic);
  }, [currentGuestData]);

  const show = useSelector((state: AppState) => state.ui.showUpdateGuest);

  useEffect(() => {
    _updateForm();
  }, [_updateForm, show]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const updatedGuestData: GuestDataUpdate = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      nickName: nickNameInput,
      email: emailInput,
      phone: phoneInput,
      isComing: isComingInput,
      didReply: true,
      foodGlutenFree: foodGlutenFreeInput,
      foodLactoseFree: foodLactoseFreeInput,
      foodDiabetic: foodDiabeticInput,
    };

    dispatch(updateGuest(updatedGuestData));

    setFirstNameInput("");
    setLastNameInput("");
    setNickNameInput("");
    setEmailInput("");
    setPhoneInput("");
    setIsComingInput(false);
    setFoodGlutenFreeInput(false);
    setFoodLactoseFreeInput(false);
    setFoodDiabeticInput(false);

    dispatch(closeUpdateGuestModal());
  };

  const closeHandler = () => {
    dispatch(closeUpdateGuestModal());
  };

  const lastNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLastNameInput(event.target.value.trim());
  };

  const firstNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstNameInput(event.target.value.trim());
  };

  const emailInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(event.target.value);
  };

  const phoneInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneInput(event.target.value);
  };

  const foodGlutenFreeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFoodGlutenFreeInput(event.target.checked);
  };

  const foodLactoseFreeInputHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setFoodLactoseFreeInput(event.target.checked);
  };

  const foodDiabeticInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFoodDiabeticInput(event.target.checked);
  };

  const yesHandler = () => {
    setIsComingInput(true);
  };

  const noHandler = () => {
    setIsComingInput(false);
  };

  return (
    <Card title="saját adatok" asOverlay onClose={closeHandler}>
      <form action="submit" onSubmit={submitHandler}>
        <fieldset>
          <legend>jössz?</legend>
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
        <div className="u-mt-3">
          <FormInput
            id="lname"
            label="vezetéknév"
            type="text"
            changeHandler={lastNameInputHandler}
            value={lastNameInput}
            disabled={!isComingInput}
          />
          <FormInput
            id="fname"
            label="keresztnév"
            type="text"
            changeHandler={firstNameInputHandler}
            value={firstNameInput}
            disabled={!isComingInput}
          />
          <FormInput
            id="email"
            label="email"
            type="email"
            changeHandler={emailInputHandler}
            value={emailInput}
            disabled={!isComingInput}
          />
          <FormInput
            id="phone"
            label="telefon"
            type="tel"
            changeHandler={phoneInputHandler}
            value={phoneInput}
            disabled={!isComingInput}
          />
        </div>

        <fieldset className="u-mt-3">
          <legend>speciális étkezési igény</legend>
          <div className="u-mt-1">
            <FormCheckbox
              id="glutenfree"
              label="gluténmentes"
              checked={foodGlutenFreeInput}
              changeHandler={foodGlutenFreeInputHandler}
              disabled={!isComingInput}
            />
            <FormCheckbox
              id="lactosefree"
              label="laktózmentes"
              checked={foodLactoseFreeInput}
              changeHandler={foodLactoseFreeInputHandler}
              disabled={!isComingInput}
            />
            <FormCheckbox
              id="diabetic"
              label="diabetikus"
              checked={foodDiabeticInput}
              changeHandler={foodDiabeticInputHandler}
              disabled={!isComingInput}
            />
          </div>
        </fieldset>

        <button className="btn btn--light cta__btn" formAction="submit">
          módosít
        </button>
      </form>
    </Card>
  );
};

export default UpdateGuest;
