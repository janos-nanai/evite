import { AppState } from "../../types/store-types";

import { useDispatch, useSelector } from "react-redux";
import { FaUserPlus as AddUserIcon } from "react-icons/fa";

import Card from "../UI/Card";
import { openNewChildModal } from "../../store/ui-slice";
import ChildDataCard from "./ChildDataCard";

const ChildrenDataCard = () => {
  const dispatch = useDispatch();

  const childrenData = useSelector(
    (state: AppState) => state.singleGuest.data!.children
  );

  const addHandler = () => {
    dispatch(openNewChildModal());
  };

  return (
    <Card title="gyerkőcök" grid big>
      <div className="card__content">
        <div className="grid">
          {childrenData &&
            childrenData.map((child) => (
              <div className="grid__item" key={child.id}>
                <ChildDataCard child={child} grid />
              </div>
            ))}
          <div className="grid__item">
            <Card grid>
              <button className="btn btn--dark cta__btn" onClick={addHandler}>
                hozzáad <AddUserIcon />
              </button>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChildrenDataCard;
