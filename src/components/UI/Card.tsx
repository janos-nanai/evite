import { ReactChild } from "react";

import { FaTimes as CloseIcon } from "react-icons/fa";

const Card = (props: {
  title?: string;
  children: ReactChild | ReactChild[];
  asOverlay?: boolean;
  grid?: boolean;
  big?: boolean;
  onClose?: () => void;
}) => {
  return (
    <div className={`${props.asOverlay ? "card__overlay" : "card__container"}`}>
      <div
        className={`card u-drop-shadow ${props.grid && "card--grid"} ${
          props.big && "card--big"
        }`}
      >
        {(!!props.title || !!props.onClose) && (
          <div className="card__header">
            <h2 className="card__title">{props.title}</h2>
            {!!props.onClose && (
              <button className="card__close-btn" onClick={props.onClose}>
                <CloseIcon />
              </button>
            )}
          </div>
        )}
        <div className="card__content">{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
