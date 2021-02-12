import {
  INBOX_LIST
} from "../actionTypes";
import axios from "axios";
import { emailPath } from "../../properties/path-properties";

export const getInboxList = (email) => async (dispatch) => {
  try {
    const inboxList = await axios.get(emailPath + `/inbox/${email}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setInboxList(inboxList.data));
  } catch (err) {
    console.log(err);
  }
};

export const setInboxList = (inboxList) => ({
  type: INBOX_LIST,
  inboxList,
});