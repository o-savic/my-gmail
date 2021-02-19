import {
  REGISTERED_USER,
  EDITED_USER,
  USER_DATA,
} from "../actionTypes";
import axios from "axios";
import { userPath } from "../../properties/path-properties"


export const registerUser = (user) => async (dispatch) => {
  try {
    const registeredUser = await axios.post(userPath, user);
    dispatch(setRegisteredUser(registeredUser.data));
    return registeredUser;
  } catch (err) {
    console.log(err);
  }
};

export const setRegisteredUser = (registeredUser) => ({
  type: REGISTERED_USER,
  registeredUser,
});

export const editUser = (user) => async (dispatch) => {
  try {
    const editedUser = await axios.put(userPath + `/${user.id}`, user);
    localStorage.setItem("firstName", editedUser.data.firstName);
    localStorage.setItem("lastName", editedUser.data.lastName);
    localStorage.setItem("usernameV", editedUser.data.username);
    localStorage.setItem("id", editedUser.data.id);
    dispatch(setEditedUser(editedUser.data));
    dispatch(setUserData(editedUser.data));
    return editedUser;
  } catch (err) {
    console.log(err);
  }
};

export const setEditedUser = (editedUser) => ({
  type: EDITED_USER,
  editedUser,
});

export const getUserData = (email) => async (dispatch) => {
  try {
    const userData = await axios.get(userPath + `/${email}`);
    localStorage.setItem("firstName", userData.data.firstName);
    localStorage.setItem("lastName", userData.data.lastName);
    localStorage.setItem("usernameV", userData.data.username);
    localStorage.setItem("id", userData.data.id);
    dispatch(setUserData(userData.data));
    return userData;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const setUserData = (userData) => ({
  type: USER_DATA,
  userData
});
