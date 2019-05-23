import * as types from "../../constants/actionTypes";

const EditProfileReducer = (
  state = {
    isLoading: false,
    hasError: false,
    validationState: null,
    isPasswordInvalid: false,
    isConfirmPasswordInvalid: false
  },
  action
) => {
  switch (action.type) {
    case types.EDIT_PROFILE_FULFILLED: {
      const { isSuccess } = action.payload;
      return isSuccess
        ? {
            ...state,
            isLoading: false,
            hasError: false,
            validationState: "success",
            isPasswordInvalid: false,
            isConfirmPasswordInvalid: false
          }
        : {
            ...state,
            isLoading: false,
            hasError: false,
            validationState: "error",
            isPasswordInvalid: true,
            isConfirmPasswordInvalid: false
          };
    }
    case types.EDIT_PROFILE_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        isPasswordInvalid: false,
        isConfirmPasswordInvalid: false
      };
    case types.EDIT_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        isPasswordInvalid: false,
        isConfirmPasswordInvalid: false
      };
    default:
      return state;
  }
};

export default EditProfileReducer;
