import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth-slice";
import { singleGuestReducer } from "./single-guest-slice";

export default configureStore({
  reducer: { auth: authReducer, singleGuest: singleGuestReducer },
});
