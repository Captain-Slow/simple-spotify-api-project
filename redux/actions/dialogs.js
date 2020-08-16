import * as types from "../types/dialogs";

export const showAlertDialog = (
  content = { title: "", message: "" },
  func = undefined
) => async (dispatch, getState) => {
  let alertDialogActive = getState().dialogs.alertDialog.show;

  if (alertDialogActive) {
    await dispatch(hideAlertDialog());

    setTimeout(async () => {
      return dispatch({
        type: types.SHOW_ALERT_DIALOG,
        payload: { content: content, func: func },
      });
    }, 500);
  } else {
    return dispatch({
      type: types.SHOW_ALERT_DIALOG,
      payload: { content: content, func: func },
    });
  }
};

export const hideAlertDialog = () => async (dispatch, getState) => {
  return dispatch({
    type: types.HIDE_ALERT_DIALOG,
  });
};

export const resetAlertDialog = () => async (dispatch, getState) => {
  return dispatch({
    type: types.RESET_ALERT_DIALOG,
  });
};
