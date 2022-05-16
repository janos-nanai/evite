import { AppState } from "../../../types/store-types";
import { ChildData } from "../../../types/guest-types";

import React, {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateChild } from "../../../store/single-guest-slice";
import { closeUpdateChildModal } from "../../../store/ui-slice";
import Card from "../../UI/Card";
import FormInput from "../FormInput";
import FormCheckbox from "../FormCheckbox";

const UpdateChild = () => {
  const [lastNameInput, setLastNameInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [nickNameInput, setNickNameInput] = useState("");
  const [ageInput, setAgeInput] = useState(0);
  const [foodGlutenFreeInput, setFoodGlutenFreeInput] = useState(false);
  const [foodLactoseFreeInput, setFoodLactoseFreeInput] = useState(false);
  const [foodDiabeticInput, setFoodDiabeticInput] = useState(false);

  const dispatch = useDispatch();

  const currentChildId = useSelector(
    (state: AppState) => state.ui.currentChildId
  );

  const currentChildData = useSelector(
    (state: AppState) =>
      state.singleGuest.data!.children.find(
        (i) => i._id === currentChildId
      ) || {
        firstName: "",
        lastName: "",
        nickName: "",
        age: 0,
        foodGlutenFree: false,
        foodLactoseFree: false,
        foodDiabetic: false,
      }
  );

  const _updateForm = useCallback(() => {
    setFirstNameInput(currentChildData.firstName);
    setLastNameInput(currentChildData.lastName);
    setNickNameInput(currentChildData.nickName);
    setAgeInput(currentChildData.age);
    setFoodGlutenFreeInput(currentChildData.foodGlutenFree);
    setFoodLactoseFreeInput(currentChildData.foodLactoseFree);
    setFoodDiabeticInput(currentChildData.foodDiabetic);
  }, [currentChildData]);

  const show = useSelector((state: AppState) => state.ui.showUpdateChild);

  useEffect(() => {
    _updateForm();
  }, [_updateForm, show]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const updatedChildData: ChildData = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      nickName: nickNameInput,
      age: ageInput,
      foodGlutenFree: foodGlutenFreeInput,
      foodLactoseFree: foodLactoseFreeInput,
      foodDiabetic: foodDiabeticInput,
    };

    dispatch(
      updateChild({
        childId: currentChildId,
        childChangeData: updatedChildData,
      })
    );

    dispatch(closeUpdateChildModal());
  };

  const closeHandler = () => {
    dispatch(closeUpdateChildModal());
  };

  const firstNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstNameInput(event.target.value.trim());
  };

  const lastNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLastNameInput(event.target.value.trim());
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
    <Card title="gyerkőc" asOverlay onClose={closeHandler}>
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
          módosít
        </button>
      </form>
    </Card>
  );
};

export default UpdateChild;
