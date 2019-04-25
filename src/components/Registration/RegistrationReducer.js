import * as types from "../../constants/actionTypes";

const RegistrationReducer = (
  state = {
    isLoading: false,
    hasError: false,
    hash: null
  },
  action
) => {
  switch (action.type) {
    case types.NEW_PROFILE_FULFILLED:
      const { graduateId } = action.payload;
      return {
        ...state,
        isLoading: false,
        hasError: false,
        graduateId
      };
    default:
      return state;
  }
};

export default RegistrationReducer;
