import { PartnerData } from "../../../types/guest-types";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { addPartner } from "../../../store/single-guest-slice";
import { closeNewPartnerModal } from "../../../store/ui-slice";
import Card from "../../UI/Card";
import FormInput from "../FormInput";
import FormCheckbox from "../FormCheckbox";

const NewPartner = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [nickNameInput, setNickNameInput] = useState("");
  const [foodGlutenFreeInput, setFoodGlutenFreeInput] = useState(false);
  const [foodLactoseFreeInput, setFoodLactoseFreeInput] = useState(false);
  const [foodDiabeticInput, setFoodDiabeticInput] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const newPartnerData: PartnerData = {
      firstName: firstNameInput.trim(),
      lastName: lastNameInput.trim(),
      nickName: nickNameInput.trim(),
      foodGlutenFree: foodGlutenFreeInput,
      foodLactoseFree: foodLactoseFreeInput,
      foodDiabetic: foodDiabeticInput,
    };

    dispatch(addPartner(newPartnerData));

    setFirstNameInput("");
    setLastNameInput("");
    setNickNameInput("");
    setFoodGlutenFreeInput(false);
    setFoodLactoseFreeInput(false);
    setFoodDiabeticInput(false);

    dispatch(closeNewPartnerModal());
  };

  const closeHandler = () => {
    dispatch(closeNewPartnerModal());
  };

  const firstNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstNameInput(event.target.value);
  };

  const lastNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLastNameInput(event.target.value);
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

  return (
    <Card title="új kísérő" asOverlay onClose={closeHandler}>
      <form action="submit" onSubmit={submitHandler}>
        <FormInput
          id="lname"
          label="vezetéknév"
          type="text"
          changeHandler={lastNameInputHandler}
          value={lastNameInput}
        />
        <FormInput
          id="fname"
          label="keresztnév"
          type="text"
          changeHandler={firstNameInputHandler}
          value={firstNameInput}
        />
        <fieldset className="form__fieldset u-mt-3">
          <legend className="form__legend">speciális étkezési igény</legend>
          <div className="u-mt-1">
            <FormCheckbox
              id="glutenfree"
              label="gluténmentes"
              checked={foodGlutenFreeInput}
              changeHandler={foodGlutenFreeInputHandler}
            />
            <FormCheckbox
              id="lactosefree"
              label="laktózmentes"
              checked={foodLactoseFreeInput}
              changeHandler={foodLactoseFreeInputHandler}
            />
            <FormCheckbox
              id="diabetic"
              label="diabetikus"
              checked={foodDiabeticInput}
              changeHandler={foodDiabeticInputHandler}
            />
          </div>
        </fieldset>

        <button className="btn btn--light cta__btn" formAction="submit">
          létrehoz
        </button>
      </form>
    </Card>
  );
};

export default NewPartner;
