import { connect } from "react-redux";
import NewUsers from "./NewUsers.jsx";

function mapStateToProps(state) {
  return {
    isAdmin: state.Shared.isAdmin
  };
}

export default connect(mapStateToProps)(NewUsers);
