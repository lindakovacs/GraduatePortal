import * as types from "../../constants/actionTypes";

const NewProfileReducer = (
  state = {
    isLoading: false,
    hasError: false,
    graduateId: null
  },
  action
) => {
  switch (action.type) {
    case types.NEW_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        hasError: false,
      };
    case types.NEW_PROFILE_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false
      };
    case types.NEW_PROFILE_REJECTED:
      return {
        ...state,
        isLoading: false,
        hasError: true
      };
    default:
      return state;
  }
};

export default NewProfileReducer;
