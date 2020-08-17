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

export const setUser = (userData) => async (dispatch, getState) => {
  return dispatch({
    type: types.SET_USER_DATA,
    payload: { user: { ...userData } },
  });
};

export const setUserPlayBack = (playbackData) => async (dispatch, getState) => {
  dispatch({
    type: types.FETCHING_PLAYBACK_DATA,
  });

  if (Object.entries(playbackData).length > 0) {
    return dispatch({
      type: types.SET_PLAYBACK_DATA,
      payload: { playBack: { ...playbackData } },
    });
  } else {
    return dispatch({
      type: types.NO_PLAYBACK_DATA,
    });
  }
};

export const fetchUserPlayBack = () => async (dispatch, getState) => {
  dispatch({
    type: types.FETCHING_PLAYBACK_DATA,
  });

  return api
    .get("currentPlayback")
    .then((response) => {
      return setTimeout(() => {
        if (response.data.error === undefined) {
          return dispatch({
            type: types.SET_PLAYBACK_DATA,
            payload: { playBack: { ...response.data.playback } },
          });
        } else {
          if (
            response.data.error === "Invalid tokens" ||
            response.data.error === "No token"
          ) {
            return dispatch({
              type: types.SET_PLAYBACK_DATA_FAILED_INVALID_TOKEN,
            });
          } else {
            return dispatch({
              type: types.NO_PLAYBACK_DATA,
            });
          }
        }
      }, 700);
    })
    .catch((error) => {
      return setTimeout(() => {
        return dispatch({
          type: types.SET_PLAYBACK_DATA_FAILED,
        });
      }, 700);
    });
};
