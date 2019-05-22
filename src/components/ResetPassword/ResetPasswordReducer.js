import * as types from "../../constants/actionTypes";

const ResetPasswordReducer = (
  state = {
    isLoading: false,
    hasError: false,
    isPasswordInvalid: false,
    validationState: null,
    token: null,
    errorMessage: null
  },
  action
) => {
  switch (action.type) {
    case types.RESET_PASSWORD_FULFILLED: {
      const { token } = action.payload;
      return token
        ? {
            ...state,
            isLoading: false,
            hasError: false,
            isPasswordInvalid: false,
            validationState: "success",
            token
          }
        : {
            ...state,
            isLoading: false,
            hasError: false,
            isPasswordInvalid: true,
            validationState: "error"
          };
    }
    case types.RESET_PASSWORD_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        isPasswordInvalid: false,
        validationState: null
      };
    case types.RESET_PASSWORD_REJECTED:
      const { message } = action.payload.response.data;
      return {
        ...state,
        isLoading: false,
        hasError: true,
        isPasswordInvalid: false,
        validationState: null,
        errorMessage: message
      };
    default:
      return state;
  }
};

export default ResetPasswordReducer;
