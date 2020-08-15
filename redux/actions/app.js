import api from "../../api/axiosOrders";
import * as types from "../types/app";

export const showSnackbar = (message, type = "", func = undefined) => async (
  dispatch,
  getState
) => {
  let snackbarActive = getState().app.snackbar.show;

  if (snackbarActive) {
    await dispatch(hideSnackbar());

    setTimeout(async () => {
      return dispatch({
        type: types.SHOW_SNACKBAR,
        payload: { message: message, func: func, type: type },
      });
    }, 500);
  } else {
    return dispatch({
      type: types.SHOW_SNACKBAR,
      payload: { message: message, func: func, type: type },
    });
  }
};

export const hideSnackbar = () => async (dispatch, getState) => {
  return dispatch({
    type: types.HIDE_SNACKBAR,
  });
};

export const resetSnackbar = () => async (dispatch, getState) => {
  return dispatch({
    type: types.RESET_SNACKBAR,
  });
};

export const fetchTokens = () => async (dispatch, getState) => {
  dispatch({
    type: types.FETCHING_TOKENS,
  });

  return api
    .get(`fetch_token`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
