import * as types from "../types/app";

const initialState = {
  snackbar: {
    show: false,
    func: null,
    message: "",
    type: "default",
  },
  error: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_SNACKBAR: {
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          show: true,
          func:
            action.payload.func === undefined
              ? initialState.snackbar.func
              : action.payload.func,
          message: action.payload.message,
          type:
            action.payload.type === ""
              ? initialState.snackbar.type
              : action.payload.type,
        },
      };
    }
    case types.HIDE_SNACKBAR: {
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          show: false,
        },
      };
    }
    case types.RESET_SNACKBAR: {
      return {
        ...state,
        snackbar: {
          ...initialState.snackbar,
        },
      };
    }
    default: {
      return state;
    }
  }
};