import * as types from "../../constants/actionTypes";

const EditProfileReducer = (
  state = {
    isLoading: false,
    hasError: false,
  },
  action
) => {
  switch (action.type) {
    case types.EDIT_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        hasError: false
        
      };
    case types.EDIT_PROFILE_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false
      };
    case types.EDIT_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        hasError: true
      };
    default:
      return state;
  }
};

export default EditProfileReducer;
