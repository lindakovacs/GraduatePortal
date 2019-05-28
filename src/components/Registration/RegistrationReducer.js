import * as types from "../../constants/actionTypes";

const RegistrationReducer = (
  state = {
    isLoading: false,
    hasError: false,
    token: null,
    errorMessage: null
  },
  action
) => {
  switch (action.type) {
    case types.NEW_USER_REGISTER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        hasError: false
      };
    case types.NEW_USER_REGISTER_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false
      };
    case types.NEW_USER_REGISTER_REJECTED:
      const { message } = action.payload.response.data;
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: message
      };
    default:
      return state;
  }
};

export default RegistrationReducer;
