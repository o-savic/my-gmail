import {
  INBOX_LIST,
  STARRED_LIST,
  SNOOZED_LIST,
  SENT_LIST,
  ALL_LIST,
  SPAM_LIST,
  TRASH_LIST,
  SENT_EMAIL,
  STARRED_EMAIL,
  DELETED_EMAIL,
  SPAM_EMAIL,
  ARCHIVED_EMAIL,
  SNOOZED_EMAIL,
  READ_EMAIL,
  DRAFT_EMAIL,
  DRAFT_LIST,
  EMAIL_DATA,
  IMPORTANT_EMAIL,
  IMPORTANT_LIST
} from "../actionTypes";
import axios from "axios";
import { emailPath } from "../../properties/path-properties";

export const sendEmail = (emailDTO) => async (dispatch) => {
  try {
    const sentEmail = await axios.post(emailPath, emailDTO, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setSentEmail(sentEmail.data));
    return sentEmail;
  } catch (err) {
    console.log(err);
  }
}

export const setSentEmail = (sentEmail) => ({
  type: SENT_EMAIL,
  sentEmail
})

export const permanentlyDeleteEmail = (id) => async (dispatch) => {
  try {
    await axios.delete(emailPath + `/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const saveDraft = (emailDTO) => async (dispatch) => {
  try {
    const draftEmail = await axios.post(emailPath + "/draft", emailDTO, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setDraftEmail(draftEmail.data));
    return draftEmail;
  } catch (err) {
    console.log(err);
  }
}

export const setDraftEmail = (draftEmail) => ({
  type: DRAFT_EMAIL,
  draftEmail
})

export const getEmailData = (id) => async (dispatch) => {
  try {
    const emailData = await axios.get(emailPath + `/${id}`);
    dispatch(setEmailData(emailData.data));
    return emailData;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const setEmailData = (emailData) => ({
  type: EMAIL_DATA,
  emailData
});

export const changeStarred = (id) => async (dispatch) => {
  try {
    const starredEmail = await axios.patch(emailPath + `/star/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setChangedStarred(starredEmail.data));
    return starredEmail;
  } catch (err) {
    console.log(err);
  }
};

export const setChangedStarred = (starredEmail) => ({
  type: STARRED_EMAIL,
  starredEmail
});

export const changeDeleted = (id) => async (dispatch) => {
  try {
    const deletedEmail = await axios.patch(emailPath + `/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setChangedDeleted(deletedEmail.data));
    return deletedEmail;
  } catch (err) {
    console.log(err);
  }
};

export const setChangedDeleted = (deletedEmail) => ({
  type: DELETED_EMAIL,
  deletedEmail
});

export const changeArchived = (id) => async (dispatch) => {
  try {
    const archivedEmail = await axios.patch(emailPath + `/archive/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setChangedArchived(archivedEmail.data));
    return archivedEmail;
  } catch (err) {
    console.log(err);
  }
};

export const setChangedArchived = (archivedEmail) => ({
  type: ARCHIVED_EMAIL,
  archivedEmail
});

export const changeSpam = (id) => async (dispatch) => {
  try {
    const spamEmail = await axios.patch(emailPath + `/spam/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setChangedSpam(spamEmail.data));
    return spamEmail;
  } catch (err) {
    console.log(err);
  }
};

export const setChangedSpam = (spamEmail) => ({
  type: SPAM_EMAIL,
  spamEmail
});

export const snoozeEmail = (email) => async (dispatch) => {
  try {
    const snoozedEmail = await axios.put(emailPath + `/snooze/${email.id}`, email);
    dispatch(setSnoozedEmail(snoozedEmail.data));
    return snoozedEmail;
  } catch (err) {
    console.log(err);
  }
};

export const setSnoozedEmail = (snoozedEmail) => ({
  type: SNOOZED_EMAIL,
  snoozedEmail,
});

export const unSnoozeEmail = (id) => async (dispatch) => {
  try {
    const unsnoozedEmail = await axios.put(emailPath + `/unsnooze/${id}`);
    return unsnoozedEmail;
  } catch (err) {
    console.log(err);
  }
};

export const changeRead = (id) => async (dispatch) => {
  try {
    const readEmail = await axios.patch(emailPath + `/read/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setChangedRead(readEmail.data));
    return readEmail;
  } catch (err) {
    console.log(err);
  }
};

export const setChangedRead = (readEmail) => ({
  type: READ_EMAIL,
  readEmail
});

export const changeImportant = (id) => async (dispatch) => {
  try {
    const importantEmail = await axios.patch(emailPath + `/important/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setChangedImportant(importantEmail.data));
    return importantEmail;
  } catch (err) {
    console.log(err);
  }
};

export const setChangedImportant = (importantEmail) => ({
  type: IMPORTANT_EMAIL,
  importantEmail
});


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

export const getDraftList = (email) => async (dispatch) => {
  try {
    const draftList = await axios.get(emailPath + `/draft/${email}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setDraftList(draftList.data));
  } catch (err) {
    console.log(err);
  }
};

export const setDraftList = (draftList) => ({
  type: DRAFT_LIST,
  draftList
});

export const getImportantList = (email) => async (dispatch) => {
  try {
    const importantList = await axios.get(emailPath + `/important/${email}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
    });
    dispatch(setImportantList(importantList.data));
  } catch (err) {
    console.log(err);
  }
};

export const setImportantList = (importantList) => ({
  type: IMPORTANT_LIST,
  importantList
});