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
    resetPassword: (password) => dispatch(resetPassword(password))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);