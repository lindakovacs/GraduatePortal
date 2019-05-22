import { connect } from "react-redux";
import ResetPassword from "./ResetPassword";
import { resetPassword } from "./ResetPasswordActions";

function mapStateToProps(state) {
  return {
    ...state.ResetPassword
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: (email, password) => dispatch(resetPassword(email, password))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);