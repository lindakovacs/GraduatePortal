import { connect } from "react-redux";
import Registration from "./Registration";
import { registernewUser } from "./RegistrationActions";

function mapStateToProps(state) {
  return {
    ...state.Registration
  };
}

const mapDispatchToProps = dispatch => ({
  registernewUser: (username, password) =>
    dispatch(registernewUser(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
