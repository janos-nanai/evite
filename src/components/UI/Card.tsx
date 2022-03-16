import { ReactChild } from "react";

const Card = (props: {
  title: string;
  children: ReactChild | ReactChild[];
}) => {
  return (
    <div className="card u-drop-shadow">
      <div className="card__header">
        <h2 className="card__title">{props.title}</h2>
      </div>
      <div className="card__content">{props.children}</div>
    </div>
  );
};

export default Card;
