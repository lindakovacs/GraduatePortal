import { NEW_USER_REGISTER } from "../../constants/actionTypes";
import { newuserRegister } from "../../services/api";

export const registernewUser = (username, password) => {
  return {
    type: NEW_USER_REGISTER,
    payload: newuserRegister(username, password)
  };
};
