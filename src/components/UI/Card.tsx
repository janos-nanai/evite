import { ReactChild } from "react";

import { FaTimes as CloseIcon } from "react-icons/fa";

const Card = (props: {
  title?: string;
  children: ReactChild | ReactChild[];
  asOverlay?: boolean;
  onClose?: () => void;
}) => {
  return (
    <div className={`${props.asOverlay && "card__overlay"} `}>
      <div className="card u-drop-shadow">
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
