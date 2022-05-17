import { ChildData } from "../../../types/guest-types";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { addChild } from "../../../store/single-guest-slice";
import { closeNewChildModal } from "../../../store/ui-slice";
import Card from "../../UI/Card";
import FormInput from "../FormInput";
import FormCheckbox from "../FormCheckbox";

const NewChild = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [nickNameInput, setNickNameInput] = useState("");
  const [ageInput, setAgeInput] = useState(0);
  const [foodGlutenFreeInput, setFoodGlutenFreeInput] = useState(false);
  const [foodLactoseFreeInput, setFoodLactoseFreeInput] = useState(false);
  const [foodDiabeticInput, setFoodDiabeticInput] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const newChildData: ChildData = {
      firstName: firstNameInput.trim(),
      lastName: lastNameInput.trim(),
      nickName: nickNameInput.trim(),
      age: ageInput,
      foodGlutenFree: foodGlutenFreeInput,
      foodLactoseFree: foodLactoseFreeInput,
      foodDiabetic: foodDiabeticInput,
    };

    dispatch(addChild(newChildData));

    setFirstNameInput("");
    setLastNameInput("");
    setNickNameInput("");
    setAgeInput(0);
    setFoodGlutenFreeInput(false);
    setFoodLactoseFreeInput(false);
    setFoodDiabeticInput(false);

    dispatch(closeNewChildModal());
  };

  const closeHandler = () => {
    dispatch(closeNewChildModal());
  };

  const firstNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstNameInput(event.target.value);
  };

  const lastNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLastNameInput(event.target.value);
  };

  const ageInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAgeInput(+event.target.value);
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
    <Card title="új gyerkőc" asOverlay onClose={closeHandler}>
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
        <FormInput
          id="age"
          label="kor (év)"
          type="number"
          changeHandler={ageInputHandler}
          value={ageInput.toString()}
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

export default NewChild;
