import { UiState } from "../types/store-types";

import { createSlice } from "@reduxjs/toolkit";

const initialState: UiState = {
  showNewPartner: false,
  showNewChild: false,
  showUpdateGuest: false,
  showUpdatePartner: false,
  showUpdateChild: false,
  showUpdateResponse: false,
  currentChildId: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openNewPartnerModal(state) {
      state.showNewPartner = true;
    },
    closeNewPartnerModal(state) {
      state.showNewPartner = false;
    },
    openNewChildModal(state) {
      state.showNewChild = true;
    },
    closeNewChildModal(state) {
      state.showNewChild = false;
    },
    openUpdateGuestModal(state) {
      state.showUpdateGuest = true;
    },
    closeUpdateGuestModal(state) {
      state.showUpdateGuest = false;
    },
    openUpdatePartnerModal(state) {
      state.showUpdatePartner = true;
    },
    closeUpdatePartnerModal(state) {
      state.showUpdatePartner = false;
    },
    openUpdateChildModal(state) {
      state.showUpdateChild = true;
    },
    closeUpdateChildModal(state) {
      state.showUpdateChild = false;
    },
    openUpdateResponseModal(state) {
      state.showUpdateResponse = true;
    },
    closeUpdateResponseModal(state) {
      state.showUpdateResponse = false;
    },
    setCurrentChildId(state, action) {
      state.currentChildId = action.payload;
    },
  },
});

export const {
  openNewPartnerModal,
  closeNewPartnerModal,
  openNewChildModal,
  closeNewChildModal,
  openUpdateGuestModal,
  closeUpdateGuestModal,
  openUpdatePartnerModal,
  closeUpdatePartnerModal,
  openUpdateChildModal,
  closeUpdateChildModal,
  openUpdateResponseModal,
  closeUpdateResponseModal,
  setCurrentChildId,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
