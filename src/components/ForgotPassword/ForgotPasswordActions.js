import { FORGOT_PASSWORD } from "../../constants/actionTypes";
import { ForgotPasswordRequest } from "../../services/api";

const ForgotPasswordAction = (email) => {
  return {
    type: FORGOT_PASSWORD,
    payload: ForgotPasswordRequest(email)
  };
};

export const forgotPassword = (email) => {
  return dispatch => {
    dispatch(ForgotPasswordAction(email))
  };
};
