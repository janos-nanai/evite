import React, { ChangeEvent } from "react";

const FormCheckbox = (props: {
  id: string;
  label: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  disabled?: boolean;
}) => {
  return (
    <div className="form__input-container">
      <input
        id={props.id}
        type="checkbox"
        onChange={props.changeHandler}
        checked={props.checked}
        disabled={props.disabled}
      />{" "}
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export default FormCheckbox;
