import { AppState } from "../../types/store-types";

import { useDispatch, useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";

import Card from "../UI/Card";
import { openUpdateGuestModal } from "../../store/ui-slice";

const GuestDataCard = () => {
  const dispatch = useDispatch();

  const {
    firstName,
    lastName,
    // nickName,
    email,
    phone,
    foodGlutenFree,
    foodLactoseFree,
    foodDiabetic,
  } = useSelector((state: AppState) => state.singleGuest.data!);

  const updateHandler = () => {
    dispatch(openUpdateGuestModal());
  };

  return (
    <Card title="saját adataid" grid>
      <div className="card__content">
        <div className="card__name">{lastName}</div>
        <div className="card__name">{firstName}</div>
      </div>
      <div className="card__content">
        <div className="card__data u-mt-1">
          elérhetőségek:
          <ul>
            <li>email: {email ? email : "-"}</li>
            <li>tel: {phone ? phone : "-"}</li>
          </ul>
        </div>
      </div>
      <div className="card__content">
        <div className="card__data u-mt-1">
          speciális étkezési igény:
          <ul>
            {foodGlutenFree && <li>gluténmentes</li>}
            {foodLactoseFree && <li>laktózmentes</li>}
            {foodDiabetic && <li>diabetikus</li>}
            {!(foodGlutenFree || foodLactoseFree || foodDiabetic) && <li>-</li>}
          </ul>
        </div>
      </div>
      <div className="btn-group">
        <button className="btn btn--dark cta__btn" onClick={updateHandler}>
          módosít <FaUserEdit />
        </button>
        {/* <button className="btn btn--warning cta__btn" onClick={deleteHandler}>
          töröl <FaUserMinus />
        </button> */}
      </div>
    </Card>
  );
};

export default GuestDataCard;
