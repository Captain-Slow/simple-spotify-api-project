import * as types from "../types/app";

const initialState = {
  user: {},
  playBack: {},
  isAuthenticated: false,
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
    case types.SET_USER_DATA: {
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    }
    case types.SET_PLAYBACK_DATA: {
      let playBack = action.payload.playBack;

      let finalAtristString = "";

      for (let [i, artist] of playBack.item.artists.entries()) {
        finalAtristString += `${i === 0 ? artist.name : `, ${artist.name}`}`;
      }

      playBack.item.artists_modified = finalAtristString;

      return {
        ...state,
        playBack: action.payload.playBack,
      };
    }
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
