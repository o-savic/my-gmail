import { combineReducers } from "redux";
import user from "./user";
import email from "./email"
const appReducer = combineReducers({
  user,
  email
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
