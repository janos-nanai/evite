import { AppState } from "../../types/store-types";
import { GuestDataUpdate, PartnerData } from "../../types/guest-types";

import React, {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  FaUserPlus as AddUserIcon,
  FaChevronRight as ForwardIcon,
  FaChevronLeft as BackwardIcon,
} from "react-icons/fa";

import Card from "../UI/Card";
import ChildDataCard from "../DataCard/ChildDataCard";
import {
  updateGuest,
  addPartner,
  updatePartner,
  deletePartner,
} from "../../store/single-guest-slice";
import FormInput from "../Form/FormInput";
import FormCheckbox from "../Form/FormCheckbox";
import FormRadio from "../Form/FormRadio";
import { openNewChildModal } from "../../store/ui-slice";

const CTA = () => {
  const dispatch = useDispatch();

  const [replyPhase, setReplyPhase] = useState(0); // 0 - 4

  const guestData = useSelector((state: AppState) => state.singleGuest.data!);

  useEffect(() => {
    if (guestData.didReply) {
      setReplyPhase(4);
    }
  }, [guestData]);

  const ReplyStart = () => {
    const [isComingInput, setIsComingInput] = useState(true);

    const submitHandler = (event: FormEvent) => {
      event.preventDefault();
      if (isComingInput) {
        dispatch(updateGuest({ isComing: isComingInput }));
        setReplyPhase(1);
      } else {
        dispatch(updateGuest({ isComing: isComingInput, didReply: true }));
        setReplyPhase(4);
      }
    };

    const yesHandler = () => {
      setIsComingInput(true);
    };

    const noHandler = () => {
      setIsComingInput(false);
    };

    return (
      <React.Fragment>
        <div className="cta u-center-text">
          <h2 className="cta__heading">Jössz, ugye?!</h2>
        </div>
        <hr className="cta__line" />
        <div className="cta">
          <form action="submit" onSubmit={submitHandler}>
            <div>
              <input
                className="cta__radio"
                type="radio"
                id="yes"
                name="coming"
                checked={isComingInput}
                onChange={yesHandler}
              />{" "}
              <label className="cta__label" htmlFor="yes">
                Igen!
              </label>
            </div>
            <div>
              <input
                className="cta__radio"
                type="radio"
                id="no"
                name="coming"
                checked={!isComingInput}
                onChange={noHandler}
              />{" "}
              <label className="cta__label" htmlFor="no">
                Nem, bocsi... :(
              </label>
            </div>
            <button className="btn btn--light cta__btn" formAction="submit">
              tovább <ForwardIcon />
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  };

  // guest data
  const Reply1 = () => {
    const [lastNameInput, setLastNameInput] = useState("");
    const [firstNameInput, setFirstNameInput] = useState("");
    const [nickNameInput, setNickNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");
    const [isComingInput, setIsComingInput] = useState(false);
    const [didReplyInput, setDidReplyInput] = useState(false);
    const [foodGlutenFreeInput, setFoodGlutenFreeInput] = useState(false);
    const [foodLactoseFreeInput, setFoodLactoseFreeInput] = useState(false);
    const [foodDiabeticInput, setFoodDiabeticInput] = useState(false);

    const currentGuestData = useSelector(
      (state: AppState) => state.singleGuest.data!
    );

    const _updateForm = useCallback(() => {
      setFirstNameInput(currentGuestData.firstName);
      setLastNameInput(currentGuestData.lastName);
      setNickNameInput(currentGuestData.nickName);
      setEmailInput(currentGuestData.email);
      setPhoneInput(currentGuestData.phone);
      setIsComingInput(currentGuestData.isComing);
      setDidReplyInput(currentGuestData.didReply);
      setFoodGlutenFreeInput(currentGuestData.foodGlutenFree);
      setFoodLactoseFreeInput(currentGuestData.foodLactoseFree);
      setFoodDiabeticInput(currentGuestData.foodDiabetic);
    }, [currentGuestData]);

    useEffect(() => {
      _updateForm();
    }, [_updateForm]);

    const backHandler = () => {
      setReplyPhase(0);
    };

    const submitHandler = (event: FormEvent) => {
      event.preventDefault();

      const updatedGuestData: GuestDataUpdate = {
        firstName: firstNameInput.trim(),
        lastName: lastNameInput.trim(),
        nickName: nickNameInput.trim(),
        email: emailInput,
        phone: phoneInput,
        isComing: isComingInput,
        didReply: didReplyInput,
        foodGlutenFree: foodGlutenFreeInput,
        foodLactoseFree: foodLactoseFreeInput,
        foodDiabetic: foodDiabeticInput,
      };

      dispatch(updateGuest(updatedGuestData));
      setReplyPhase(2);
    };

    const lastNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setLastNameInput(event.target.value);
    };

    const firstNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setFirstNameInput(event.target.value);
    };

    const emailInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setEmailInput(event.target.value);
    };

    const phoneInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setPhoneInput(event.target.value);
    };

    const foodGlutenFreeInputHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      setFoodGlutenFreeInput(event.target.checked);
    };
    const foodLactoseFreeInputHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      setFoodLactoseFreeInput(event.target.checked);
    };
    const foodDiabeticInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setFoodDiabeticInput(event.target.checked);
    };

    return (
      <React.Fragment>
        <div className="cta u-center-text">
          <h2 className="cta__heading">Add meg az adataid</h2>
        </div>
        <hr className="cta__line" />
        <div className="cta">
          <form action="submit" onSubmit={submitHandler}>
            <FormInput
              id="lname"
              label="vezetéknév"
              type="text"
              changeHandler={lastNameInputHandler}
              value={lastNameInput}
            />
            <FormInput
              id="fname"
              label="keresztnév"
              type="text"
              changeHandler={firstNameInputHandler}
              value={firstNameInput}
            />
            <FormInput
              id="email"
              label="email"
              type="email"
              changeHandler={emailInputHandler}
              value={emailInput}
            />
            <FormInput
              id="phone"
              label="telefon"
              type="tel"
              changeHandler={phoneInputHandler}
              value={phoneInput}
            />

            <fieldset className="form__fieldset u-mt-3">
              <legend className="form__legend">speciális étkezési igény</legend>

              <FormCheckbox
                id="glutenfree"
                label="gluténmentes"
                checked={foodGlutenFreeInput}
                changeHandler={foodGlutenFreeInputHandler}
              />
              <FormCheckbox
                id="lactosefree"
                label="laktózmentes"
                checked={foodLactoseFreeInput}
                changeHandler={foodLactoseFreeInputHandler}
              />
              <FormCheckbox
                id="diabetic"
                label="diabetikus"
                checked={foodDiabeticInput}
                changeHandler={foodDiabeticInputHandler}
              />
            </fieldset>
            <div className="btn-group">
              <button className="btn btn--dark cta__btn" onClick={backHandler}>
                <BackwardIcon /> vissza
              </button>
              <button className="btn btn--light cta__btn" formAction="submit">
                tovább <ForwardIcon />
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  };

  // partner data
  const Reply2 = () => {
    const [lastNameInput, setLastNameInput] = useState("");
    const [firstNameInput, setFirstNameInput] = useState("");
    const [nickNameInput, setNickNameInput] = useState("");
    const [foodGlutenFreeInput, setFoodGlutenFreeInput] = useState(false);
    const [foodLactoseFreeInput, setFoodLactoseFreeInput] = useState(false);
    const [foodDiabeticInput, setFoodDiabeticInput] = useState(false);
    const [addPartnerInput, setAddPartnerInput] = useState(false);

    const currentPartnerData = useSelector(
      (state: AppState) =>
        state.singleGuest.data!.partner || {
          firstName: "",
          lastName: "",
          nickName: "",
          foodGlutenFree: false,
          foodLactoseFree: false,
          foodDiabetic: false,
        }
    );

    const _updateForm = useCallback(() => {
      setFirstNameInput(currentPartnerData.firstName);
      setLastNameInput(currentPartnerData.lastName);
      setNickNameInput(currentPartnerData.nickName);
      setFoodGlutenFreeInput(currentPartnerData.foodGlutenFree);
      setFoodLactoseFreeInput(currentPartnerData.foodLactoseFree);
      setFoodDiabeticInput(currentPartnerData.foodDiabetic);
      setAddPartnerInput(!!guestData.partner);
    }, [currentPartnerData]);

    useEffect(() => {
      _updateForm();
    }, []);

    const backHandler = () => {
      setReplyPhase(1);
    };

    const submitHandler = (event: FormEvent) => {
      event.preventDefault();

      if (addPartnerInput) {
        const updatedPartnerData: PartnerData = {
          firstName: firstNameInput.trim(),
          lastName: lastNameInput.trim(),
          nickName: nickNameInput.trim(),
          foodGlutenFree: foodGlutenFreeInput,
          foodLactoseFree: foodLactoseFreeInput,
          foodDiabetic: foodDiabeticInput,
        };
        if (!guestData.partner) {
          dispatch(addPartner(updatedPartnerData));
        } else {
          dispatch(updatePartner(updatedPartnerData));
        }
      } else if (guestData.partner) {
        dispatch(deletePartner());
      }

      setReplyPhase(3);
    };

    const lastNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setLastNameInput(event.target.value);
    };

    const firstNameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setFirstNameInput(event.target.value);
    };

    const foodGlutenFreeInputHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      setFoodGlutenFreeInput(event.target.checked);
    };
    const foodLactoseFreeInputHandler = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      setFoodLactoseFreeInput(event.target.checked);
    };
    const foodDiabeticInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setFoodDiabeticInput(event.target.checked);
    };

    const yesHandler = () => {
      setAddPartnerInput(true);
    };

    const noHandler = () => {
      setAddPartnerInput(false);
    };

    return (
      <React.Fragment>
        <div className="cta u-center-text">
          <h2 className="cta__heading">Kísérőt hozol?</h2>
        </div>
        <hr className="cta__line" />
        <div className="cta">
          <form action="submit" onSubmit={submitHandler}>
            <FormRadio
              id="yes"
              name="add-partner"
              label="igen"
              changeHandler={yesHandler}
              checked={addPartnerInput}
            />

            <FormRadio
              id="no"
              name="add-partner"
              label="nem"
              changeHandler={noHandler}
              checked={!addPartnerInput}
            />

            <FormInput
              id="lname"
              label="vezetéknév"
              type="text"
              disabled={!addPartnerInput}
              changeHandler={lastNameInputHandler}
              value={lastNameInput}
            />
            <FormInput
              id="fname"
              label="keresztnév"
              type="text"
              disabled={!addPartnerInput}
              changeHandler={firstNameInputHandler}
              value={firstNameInput}
            />
            <fieldset className="form__fieldset u-mt-3">
              <legend className="form__legend">speciális étkezési igény</legend>
              <FormCheckbox
                id="glutenfree"
                label="gluténmentes"
                disabled={!addPartnerInput}
                checked={foodGlutenFreeInput}
                changeHandler={foodGlutenFreeInputHandler}
              />
              <FormCheckbox
                id="lactosefree"
                label="laktózmentes"
                disabled={!addPartnerInput}
                checked={foodLactoseFreeInput}
                changeHandler={foodLactoseFreeInputHandler}
              />
              <FormCheckbox
                id="diabetic"
                label="diabetikus"
                disabled={!addPartnerInput}
                checked={foodDiabeticInput}
                changeHandler={foodDiabeticInputHandler}
              />
            </fieldset>

            <div className="btn-group">
              <button className="btn btn--dark cta__btn" onClick={backHandler}>
                <BackwardIcon /> vissza
              </button>
              <button className="btn btn--light cta__btn" formAction="submit">
                tovább <ForwardIcon />
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  };

  // children data
  const Reply3 = () => {
    const backHandler = () => {
      setReplyPhase(2);
    };

    const submitHandler = (event: FormEvent) => {
      event.preventDefault();
      dispatch(updateGuest({ didReply: true }));
      setReplyPhase(4);
    };

    const addHandler = () => {
      dispatch(openNewChildModal());
    };

    return (
      <React.Fragment>
        <div className="cta u-center-text">
          <h2 className="cta__heading">Gyerkőcök</h2>
        </div>
        <hr className="cta__line" />
        <div className="cta">
          <ul>
            {guestData.children.map((child) => (
              <li key={child.id}>
                <ChildDataCard child={child} />
              </li>
            ))}
            <li>
              <Card>
                <button className="btn btn--dark cta__btn" onClick={addHandler}>
                  hozzáad <AddUserIcon />
                </button>
              </Card>
            </li>
          </ul>
          <div className="btn-group">
            <button className="btn btn--dark cta__btn" onClick={backHandler}>
              <BackwardIcon /> vissza
            </button>
            <button className="btn btn--light cta__btn" onClick={submitHandler}>
              tovább <ForwardIcon />
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const ReplyDone = () => {
    return (
      <React.Fragment>
        <div className="cta u-center-text">
          <h2 className="cta__heading">Köszi a visszajelzést!</h2>
        </div>
        <hr className="cta__line" />
        <div className="cta cta__big-text">
          {guestData.isComing && (
            <React.Fragment>
              {"Várunk szeretettel!"} <br />
              {"Nézd át az adataid és módosítsd ha kell!"} <br />
            </React.Fragment>
          )}
          {!guestData.isComing && (
            <React.Fragment>
              {"Sajnáljuk, hogy nem tudsz jönni."}
              <br />
              {"Ha meggondoltad magad, itt tudod módosítani a visszajelzésed."}
              <br />
            </React.Fragment>
          )}
          <NavLink
            to="/guest-data"
            className="btn btn--light cta__btn"
            style={{
              display: "inline-block",
            }}
          >
            adataid
          </NavLink>
        </div>
      </React.Fragment>
    );
  };

  return (
    <section className="section-cta">
      {replyPhase === 0 && <ReplyStart />}
      {replyPhase === 1 && <Reply1 />}
      {replyPhase === 2 && <Reply2 />}
      {replyPhase === 3 && <Reply3 />}
      {replyPhase === 4 && <ReplyDone />}
    </section>
  );
};

export default CTA;
