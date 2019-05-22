import history from "../../history";
import { RESET_PASSWORD } from "../../constants/actionTypes";
import { ResetPasswordRequest } from "../../services/api";

const ResetPasswordAction = (token, password) => {
  return {
    type: RESET_PASSWORD,
    payload: ResetPasswordRequest(token, password)
  };
};

export const resetPassword = (token, password) => {
  return dispatch => {
    dispatch(ResetPasswordAction(token, password)).then(data => {
      if (data.value.token) {
        history.push("/");
      }
    });
  };
};
