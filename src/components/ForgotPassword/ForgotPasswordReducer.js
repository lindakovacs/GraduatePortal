import * as types from "../../constants/actionTypes";

const ForgotPasswordReducer = (
  state = {
    isLoading: false,
    hasError: false,
    isEmailInvalid: false,
    validationState: null
  },
  action
) => {
  switch (action.type) {
    case types.FORGOT_PASSWORD_FULFILLED: {
      const { isSuccess } = action.payload;
      return isSuccess
        ? {
            ...state,
            isLoading: false,
            hasError: false,
            isEmailInvalid: false,
            validationState: "success"
          }
        : {
            ...state,
            isLoading: false,
            hasError: false,
            isEmailInvalid: true,
            validationState: "error"
          };
    }
    case types.FORGOT_PASSWORD_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        isEmailInvalid: false,
        validationState: null
      };
    case types.FORGOT_PASSWORD_REJECTED:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        isEmailInvalid: false,
        validationState: null
      };
    default:
      return state;
  }
};

export default ForgotPasswordReducer;
