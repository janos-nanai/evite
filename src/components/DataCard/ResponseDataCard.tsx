import { AppState } from "../../types/store-types";

import { useDispatch, useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";

import Card from "../UI/Card";
import { openUpdateResponseModal } from "../../store/ui-slice";

const ResponseDataCard = () => {
  const dispatch = useDispatch();

  const isComing = useSelector(
    (state: AppState) => state.singleGuest.data?.isComing
  );

  const updateHandler = () => {
    dispatch(openUpdateResponseModal());
  };

  return (
    <Card title="visszajelzésed">
      <div className="card__content card__name">
        {isComing && "Jövök!"}
        {!isComing && "Nem jövök, bocsi... :("}
      </div>
      <div className="btn-group">
        <button className="btn btn--dark cta__btn" onClick={updateHandler}>
          módosít <FaUserEdit />
        </button>
      </div>
    </Card>
  );
};

export default ResponseDataCard;
