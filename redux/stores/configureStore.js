import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";

const logger = (store) => {
  return (next) => {
    return (action) => {
      // console.log("[Middleware] dispatching", action)
      const result = next(action);

      // console.log("[Middleware] next state", store.getState())
      return result;
    };
  };
};

const composeEnhancer =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store =
  composeEnhancer === undefined
    ? createStore(reducers)
    : createStore(reducers, composeEnhancer(applyMiddleware(logger, thunk)));

export default store;
