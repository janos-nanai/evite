import axios from "axios";

import { refreshAccessToken } from "../store/auth-slice";
import store from "../store";

const API_URL = process.env.REACT_APP_BACKEND_ENTRY_POINT;

export const authAccessReqInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const { accessToken } = store.getState().auth;

      if (accessToken) {
        config.headers!.authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const authRefreshResInterceptor = () => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      const { refreshToken } = store.getState().auth;
      if (
        originalConfig.url !== `${API_URL}/auth/user-login` &&
        err.response &&
        refreshToken
      ) {
        if (err.response.status === 401 && !originalConfig._authRetryFlag) {
          originalConfig._authRetryFlag = true;
          try {
            const response = await axios.post(`${API_URL}/auth/token`, {
              token: refreshToken,
            });
            const { id: guestId, token: accessToken } = response.data;

            // console.log(guestId, accessToken);

            store.dispatch(refreshAccessToken({ guestId, accessToken }));

            return axios(originalConfig);
          } catch (_err) {
            return Promise.reject(_err);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};
