import { connect } from "react-redux";
import ForgotPassword from "./ForgotPassword";
import { forgotPassword } from "./ForgotPasswordActions";

function mapStateToProps(state) {
  return {
    ...state.ForgotPassword
  };
}

function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: (email) => dispatch(forgotPassword(email))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);