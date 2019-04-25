import { connect } from "react-redux";
import Registration from "./Registration";
import {} from "./RegistrationActions";

function mapStateToProps(dummy) {
  return {
    dummy
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
