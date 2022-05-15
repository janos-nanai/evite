import { AppState } from "../../types/store-types";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUserPlus as AddUserIcon,
  FaUserEdit,
  FaUserMinus,
} from "react-icons/fa";

import Card from "../UI/Card";
import { deletePartner } from "../../store/single-guest-slice";
import {
  openNewPartnerModal,
  openUpdatePartnerModal,
} from "../../store/ui-slice";

const PartnerDataCard = () => {
  const dispatch = useDispatch();

  const partnerData = useSelector(
    (state: AppState) => state.singleGuest.data!.partner
  );

  const updateHandler = () => {
    dispatch(openUpdatePartnerModal());
  };

  const deleteHandler = () => {
    dispatch(deletePartner());
  };

  const addHandler = () => {
    dispatch(openNewPartnerModal());
  };

  let cardContent = (
    <button className="btn btn--dark cta__btn" onClick={addHandler}>
      hozzáad <AddUserIcon />
    </button>
  );

  if (partnerData) {
    const {
      firstName,
      lastName,
      // nickName,
      foodGlutenFree,
      foodLactoseFree,
      foodDiabetic,
    } = partnerData;

    cardContent = (
      <React.Fragment>
        <div className="card__content">
          <div className="card__name">{lastName}</div>
          <div className="card__name">{firstName}</div>
        </div>
        <div className="card__content">
          <div className="card__data u-mt-1">
            speciális étkezési igény:
            <ul>
              {foodGlutenFree && <li>gluténmentes</li>}
              {foodLactoseFree && <li>laktózmentes</li>}
              {foodDiabetic && <li>diabetikus</li>}
              {!(foodGlutenFree || foodLactoseFree || foodDiabetic) && (
                <li>-</li>
              )}
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
      </React.Fragment>
    );
  }

  return (
    <Card title="kísérő" grid>
      {cardContent}
    </Card>
  );
};

export default PartnerDataCard;
