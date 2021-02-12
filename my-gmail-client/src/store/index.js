import rootReducer from "./reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

export const configureStore = () =>
  createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );
