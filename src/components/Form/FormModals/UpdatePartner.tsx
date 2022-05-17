import { AppState } from "../../../types/store-types";
import { PartnerData } from "../../../types/guest-types";

import React, {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { updatePartner } from "../../../store/single-guest-slice";
import { closeUpdatePartnerModal } from "../../../store/ui-slice";
import Card from "../../UI/Card";
import FormInput from "../FormInput";
import FormCheckbox from "../FormCheckbox";

const UpdatePartner = () => {
  const [lastNameInput, setLastNameInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [nickNameInput, setNickNameInput] = useState("");
  const [foodGlutenFreeInput, setFoodGlutenFreeInput] = useState(false);
  const [foodLactoseFreeInput, setFoodLactoseFreeInput] = useState(false);
  const [foodDiabeticInput, setFoodDiabeticInput] = useState(false);

  const dispatch = useDispatch();

  const currentPartnerData = useSelector(
    (state: AppState) =>
      state.singleGuest.data!.partner || {
        firstName: "",
        lastName: "",
        nickName: "",
        foodGlutenFree: false,
        foodLactoseFree: false,
        foodDiabetic: false,
      }
  );

  const _updateForm = useCallback(() => {
    setFirstNameInput(currentPartnerData.firstName);
    setLastNameInput(currentPartnerData.lastName);
    setNickNameInput(currentPartnerData.nickName);
    setFoodGlutenFreeInput(currentPartnerData.foodGlutenFree);
    setFoodLactoseFreeInput(currentPartnerData.foodLactoseFree);
    setFoodDiabeticInput(currentPartnerData.foodDiabetic);
  }, [currentPartnerData]);

  const show = useSelector((state: AppState) => state.ui.showUpdatePartner);

  useEffect(() => {
    _updateForm();
  }, [_updateForm, show]);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const updatedPartnerData: PartnerData = {
      firstName: firstNameInput.trim(),
      lastName: lastNameInput.trim(),
      nickName: nickNameInput.trim(),
      foodGlutenFree: foodGlutenFreeInput,
      foodLactoseFree: foodLactoseFreeInput,
      foodDiabetic: foodDiabeticInput,
    };

    dispatch(updatePartner(updatedPartnerData));

    dispatch(closeUpdatePartnerModal());
  };

  const closeHandler = () => {
    dispatch(closeUpdatePartnerModal());
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
    <Card title="kísérő" asOverlay onClose={closeHandler}>
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
          módosít
        </button>
      </form>
    </Card>
  );
};

export default UpdatePartner;
