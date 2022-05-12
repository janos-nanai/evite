import { ChildData } from "../../types/guest-types";

import { useDispatch } from "react-redux";
import { FaUserEdit, FaUserMinus } from "react-icons/fa";

import Card from "../UI/Card";
import { deleteChild } from "../../store/single-guest-slice";
import { openUpdateChildModal, setCurrentChildId } from "../../store/ui-slice";

const ChildDataCard = (props: ChildData) => {
  const dispatch = useDispatch();

  const {
    id,
    firstName,
    lastName,
    // nickName,
    age,
    foodGlutenFree,
    foodLactoseFree,
    foodDiabetic,
  } = props;

  const updateHandler = () => {
    dispatch(setCurrentChildId(id));
    console.log(id);

    dispatch(openUpdateChildModal());
  };

  const deleteHandler = () => {
    dispatch(deleteChild(id!));
  };

  return (
    <Card>
      <div className="card__content">
        <div className="card__name">{lastName}</div>
        <div className="card__name">{firstName}</div>
      </div>
      <div className="card__content">
        <div className="card__data">
          <span>kor:</span> <span>{age}</span>
        </div>
        <div className="card__data u-mt-1">
          speciális étkezési igény:
          <ul>
            {foodGlutenFree && <li>gluténmentes</li>}
            {foodLactoseFree && <li>laktózmentes</li>}
            {foodDiabetic && <li>diabetikus</li>}
          </ul>
        </div>
      </div>
      <div className="btn-group">
        <button className="btn btn--dark cta__btn" onClick={updateHandler}>
          módosít <FaUserEdit />
        </button>
        <button className="btn btn--warning cta__btn" onClick={deleteHandler}>
          töröl <FaUserMinus />
        </button>
      </div>
    </Card>
  );
};

export default ChildDataCard;
