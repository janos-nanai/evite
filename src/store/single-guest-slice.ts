import { SingleGuestState } from "../types/store-types";
import { ChildData, PartnerData, GuestData } from "../types/guest-types";
import { AppState } from "../types/store-types";

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = process.env.REACT_APP_BACKEND_ENTRY_POINT + "/guest";

const null_timestamp = 0;

const namespace = "singleGuest";

export const fetchOneById = createAsyncThunk(
  `${namespace}/fetchOneById`,
  async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

export const updateGuest = createAsyncThunk(
  `${namespace}/updateGuest`,
  async (guestChangeData: {}, { getState }) => {
    const state = getState() as AppState;
    const guestState = state.singleGuest;
    const response = await axios.patch(
      `${API_URL}/${guestState.data!._id}`,
      guestChangeData
    );
    return response.data;
  }
);

export const addPartner = createAsyncThunk(
  `${namespace}/addPartner`,
  async (partnerData: PartnerData, { getState }) => {
    const state = getState() as AppState;
    const id = state.singleGuest.data!._id;
    const response = await axios.post(`${API_URL}/${id}/partner`, partnerData);
    return response.data;
  }
);

export const deletePartner = createAsyncThunk(
  `${namespace}/deletePartner`,
  async (_, { getState }) => {
    const state = getState() as AppState;
    const id = state.singleGuest.data!._id;
    await axios.delete(`${API_URL}/${id}/partner`);
  }
);

export const updatePartner = createAsyncThunk(
  `${namespace}/updatePartner`,
  async (partnerChangeData: {}, { getState }) => {
    const state = getState() as AppState;
    const id = state.singleGuest.data!._id;
    const response = await axios.patch(`${API_URL}/${id}`, partnerChangeData);
    return response.data;
  }
);

export const addChild = createAsyncThunk(
  `${namespace}/addChild`,
  async (childData: ChildData, { getState }) => {
    const state = getState() as AppState;
    const id = state.singleGuest.data!._id;
    const response = await axios.post(`${API_URL}/${id}/children`, childData);
    return response.data;
  }
);

export const deleteChild = createAsyncThunk(
  `${namespace}/deleteChild`,
  async (childId: string, { getState }) => {
    const state = getState() as AppState;
    const id = state.singleGuest.data!._id;
    await axios.delete(`${API_URL}/${id}/children/${childId}`);
    return childId;
  }
);

export const updateChild = createAsyncThunk(
  `${namespace}/updateChild`,
  async (args: { childId: string; childChangeData: {} }, { getState }) => {
    const state = getState() as AppState;
    const id = state.singleGuest.data!._id;
    const response = await axios.patch(
      `${API_URL}/${id}/children/${args.childId}`,
      args.childChangeData
    );
    return response.data;
  }
);

const initialState: SingleGuestState = {
  data: {
    _id: "",
    firstName: "",
    lastName: "",
    nickName: "",
    isComing: false,
    didReply: false,
    email: "",
    phone: "",
    foodGlutenFree: false,
    foodLactoseFree: false,
    foodDiabetic: false,
    partner: null,
    children: [],
    createdDate: null_timestamp,
    modifiedDate: null_timestamp,
  },
  isLoading: false,
};

const singleGuestSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchOneById
    builder.addCase(fetchOneById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOneById.fulfilled, (state, action) => {
      state.isLoading = false;
      const guestData: GuestData = action.payload;
      state.data = guestData;
    });
    builder.addCase(fetchOneById.rejected, (state) => {
      state.isLoading = false;
    });

    // updateGuest
    builder.addCase(updateGuest.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateGuest.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedGuest: GuestData = action.payload;
      state.data = updatedGuest;
    });
    builder.addCase(updateGuest.rejected, (state) => {
      state.isLoading = false;
    });

    // addPartner
    builder.addCase(addPartner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addPartner.fulfilled, (state, action) => {
      state.isLoading = false;
      const newPartner: PartnerData = action.payload;
      state.data!.partner = newPartner;
    });
    builder.addCase(addPartner.rejected, (state) => {
      state.isLoading = false;
    });

    // updatePartner
    builder.addCase(updatePartner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePartner.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedPartner: PartnerData = action.payload;
      state.data!.partner = updatedPartner;
    });
    builder.addCase(updatePartner.rejected, (state) => {
      state.isLoading = false;
    });

    // deletePartner
    builder.addCase(deletePartner.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePartner.fulfilled, (state) => {
      state.isLoading = false;
      state.data!.partner = null;
    });
    builder.addCase(deletePartner.rejected, (state) => {
      state.isLoading = false;
    });

    // addChild
    builder.addCase(addChild.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addChild.fulfilled, (state, action) => {
      state.isLoading = false;
      const newChild: ChildData = action.payload;
      state.data!.children.push(newChild);
    });
    builder.addCase(addChild.rejected, (state) => {
      state.isLoading = false;
    });

    // updateChild
    builder.addCase(updateChild.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateChild.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedChild: ChildData = action.payload;
      const childIndex = state.data!.children.findIndex(
        (i) => i._id === updatedChild._id
      );
      state.data!.children[childIndex] = updatedChild;
    });
    builder.addCase(updateChild.rejected, (state) => {
      state.isLoading = false;
    });

    // deleteChild
    builder.addCase(deleteChild.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteChild.fulfilled, (state, action) => {
      state.isLoading = false;
      const childId = action.payload;
      state.data!.children = state.data!.children.filter(
        (i) => i._id !== childId
      );
    });
    builder.addCase(deleteChild.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const singleGuestReducer = singleGuestSlice.reducer;
