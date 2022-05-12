import React, { ChangeEvent } from "react";

const FormRadio = (props: {
  id: string;
  name: string;
  label: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}) => {
  return (
    <div className="form__input-container">
      <input
        id={props.id}
        name={props.name}
        type="radio"
        onChange={props.changeHandler}
        checked={props.checked}
      />{" "}
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default FormRadio;
