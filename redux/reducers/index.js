import { combineReducers } from "redux";
import { reducer as app } from "./app";
import { reducer as dialogs } from "./dialogs";

export default combineReducers({
  app,
  dialogs,
});
