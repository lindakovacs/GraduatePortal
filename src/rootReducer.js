import { combineReducers } from "redux";
import LoginReducer from "./components/Login/LoginReducer";
import sharedReducer from "./sharedReducer";
import EditProfileReducer from "./components/EditProfile/EditProfileReducer";
import NewProfileReducer from "./components/NewProfile/NewProfileReducer";
import SearchReducer from "./components/Search/SearchReducer";
import RegistrationReducer from "./components/Registration/RegistrationReducer";
import ForgotPasswordReducer from './components/ForgotPassword/ForgotPasswordReducer';
import ResetPasswordReducer from './components/ResetPassword/ResetPasswordReducer';

const rootReducer = combineReducers({
  Shared: sharedReducer,
  Login: LoginReducer,
  Search: SearchReducer,
  EditProfile: EditProfileReducer,
  NewProfile: NewProfileReducer,
  Registration: RegistrationReducer,
  ForgotPassword: ForgotPasswordReducer,
  ResetPassword: ResetPasswordReducer
});

export default rootReducer;
