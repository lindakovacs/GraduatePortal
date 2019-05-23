import * as types from "./constants/actionTypes";

const sharedReducer = (
  state = {
    profiles: null,
    isAdmin: !!localStorage.token,
    isLoading: false,
    hasError: false,
    isGrad: !!localStorage.token,
    graduateId: ""
  },
  action
) => {
  switch (action.type) {
    case types.LOGIN_FULFILLED: {
      const { token, isGrad, graduateId } = action.payload;
      console.log(graduateId);
      return token
        ? { ...state, isAdmin: !isGrad, isGrad: isGrad, graduateId: graduateId }
        : { ...state, isAdmin: false, isGrad: false };
    }
    case types.LOGOUT:
      return {
        ...state,
        isAdmin: false,
        isGrad: false,
        graduateId: ""
      };
    case types.FETCH_ALL_PROFILES_FULFILLED: {
      const { profiles } = action.payload;
      return {
        ...state,
        isLoading: false,
        profiles
      };
    }
    case types.FETCH_ALL_PROFILES_PENDING:
      return {
        ...state,
        isLoading: true,
        hasError: false
      };
    case types.FETCH_ALL_PROFILES_REJECTED:
      return {
        ...state,
        isLoading: false,
        hasError: true
      };
    default:
      return state;
  }
};

export default sharedReducer;
