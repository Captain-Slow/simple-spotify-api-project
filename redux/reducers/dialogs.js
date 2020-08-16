import * as types from "../types/dialogs";

const initialState = {
  alertDialog: {
    show: false,
    func: null,
    content: {
      title: "",
      message: "",
    },
  },
  error: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALERT_DIALOG: {
      return {
        ...state,
        alertDialog: {
          ...state.alertDialog,
          show: true,
          func:
            action.payload.func === undefined
              ? initialState.alertDialog.func
              : action.payload.func,
          content: {
            ...state.alertDialog.content,
            ...action.payload.content,
          },
        },
      };
    }
    case types.HIDE_ALERT_DIALOG: {
      return {
        ...state,
        alertDialog: {
          ...state.alertDialog,
          show: false,
        },
      };
    }
    case types.RESET_ALERT_DIALOG: {
      return {
        ...state,
        alertDialog: {
          ...initialState.alertDialog,
        },
      };
    }
    default: {
      return state;
    }
  }
};
