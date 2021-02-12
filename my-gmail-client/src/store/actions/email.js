import {
  INBOX_LIST,
  STARRED_LIST,
  SNOOZED_LIST,
  SENT_LIST,
  ALL_LIST,
  SPAM_LIST,
  TRASH_LIST
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
  inboxList
});

export const getStarredList = (email) => async (dispatch) => {
  try {
    const starredList = await axios.get(emailPath + `/starred/${email}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setStarredList(starredList.data));
  } catch (err) {
    console.log(err);
  }
};

export const setStarredList = (starredList) => ({
  type: STARRED_LIST,
  starredList
});

export const getSnoozedList = (email) => async (dispatch) => {
  try {
    const snoozedList = await axios.get(emailPath + `/snoozed/${email}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setSnoozedList(snoozedList.data));
  } catch (err) {
    console.log(err);
  }
};

export const setSnoozedList = (snoozedList) => ({
  type: SNOOZED_LIST,
  snoozedList
});

export const getSentList = (email) => async (dispatch) => {
  try {
    const sentList = await axios.get(emailPath + `/sent/${email}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setSentList(sentList.data));
  } catch (err) {
    console.log(err);
  }
};

export const setSentList = (sentList) => ({
  type: SENT_LIST,
  sentList
});

export const getAllList = (email) => async (dispatch) => {
  try {
    const allList = await axios.get(emailPath + `/all/${email}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setAllList(allList.data));
  } catch (err) {
    console.log(err);
  }
};

export const setAllList = (allList) => ({
  type: ALL_LIST,
  allList
});

export const getSpamList = (email) => async (dispatch) => {
  try {
    const spamList = await axios.get(emailPath + `/spam/${email}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setSpamList(spamList.data));
  } catch (err) {
    console.log(err);
  }
};

export const setSpamList = (spamList) => ({
  type: SPAM_LIST,
  spamList
});

export const getTrashList = (email) => async (dispatch) => {
  try {
    const trashList = await axios.get(emailPath + `/trash/${email}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setTrashList(trashList.data));
  } catch (err) {
    console.log(err);
  }
};

export const setTrashList = (trashList) => ({
  type: TRASH_LIST,
  trashList
});