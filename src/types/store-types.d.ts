import store from "../store";
import { GuestData } from "./guest-types";

export type AppState = ReturnType<typeof store.getState>;

export interface AuthState {
  guestId: string;
  accessToken: string;
  refreshToken: string;
  isLoading: boolean;
  error: string | any;
}

export interface SingleGuestState {
  data: GuestData | null;
  isLoading: boolean;
}

export interface UiState {
  showNewPartner: boolean;
  showNewChild: boolean;
  showUpdateGuest: boolean;
  showUpdatePartner: boolean;
  showUpdateChild: boolean;
  currentChildId: string;
}
