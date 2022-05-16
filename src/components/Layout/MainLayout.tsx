import { AppState } from "../../types/store-types";

import React, { ReactChild } from "react";

import LoadingSpinner from "../UI/LoadingSpinner";
import NewPartner from "../Form/FormModals/NewPartner";
import NewChild from "../Form/FormModals/NewChild";
import UpdateGuest from "../Form/FormModals/UpdateGuest";
import UpdatePartner from "../Form/FormModals/UpdatePartner";
import UpdateChild from "../Form/FormModals/UpdateChild";
import UpdateResponse from "../Form/FormModals/UpdateResponse";

import { useSelector } from "react-redux";

const Layout = (props: { children: ReactChild | ReactChild[] }) => {
  const {
    showNewPartner,
    showNewChild,
    showUpdateGuest,
    showUpdatePartner,
    showUpdateChild,
    showUpdateResponse,
  } = useSelector((state: AppState) => state.ui);

  const { isLoading } = useSelector((state: AppState) => state.singleGuest);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverLay />}
      {showNewPartner && <NewPartner />}
      {showNewChild && <NewChild />}
      {showUpdateGuest && <UpdateGuest />}
      {showUpdatePartner && <UpdatePartner />}
      {showUpdateChild && <UpdateChild />}
      {showUpdateResponse && <UpdateResponse />}

      {props.children}
    </React.Fragment>
  );
};

export default Layout;
