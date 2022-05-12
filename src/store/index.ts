import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth-slice";
import { singleGuestReducer } from "./single-guest-slice";
import { uiReducer } from "./ui-slice";

export default configureStore({
  reducer: {
    auth: authReducer,
    singleGuest: singleGuestReducer,
    ui: uiReducer,
  },
});
