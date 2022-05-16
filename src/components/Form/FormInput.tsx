import { ChangeEvent } from "react";

const FormInput = (props: {
  id: string;
  label: string;
  type: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
}) => {
  return (
    <div className="form__input-container form__input-container--col">
      <label className="form__label" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className="form__input"
        id={props.id}
        type={props.type}
        onChange={props.changeHandler}
        value={props.value}
        disabled={props.disabled}
      />
    </div>
  );
};

export default FormInput;
