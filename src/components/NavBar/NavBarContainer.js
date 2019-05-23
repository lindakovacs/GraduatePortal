import { connect } from "react-redux";
import NavBar from "./NavBar";
import { logout } from "./NavBarActions";

function mapStateToProps(state) {
  return {
    isAdmin: state.Shared.isAdmin,
    isGrad: state.Shared.isGrad
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
