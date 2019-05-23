import { connect } from "react-redux";
import NewProfile from "./NewProfile";
import {
  profileNew,
  uploadImageFile,
  uploadResumeFile
} from "./NewProfileActions";

function mapStateToProps(state) {
  return {
    ...state.NewProfile
  };
}

const mapDispatchToProps = dispatch => ({
  profileNew: profileData => dispatch(profileNew(profileData)),
  uploadImageFile: data => dispatch(uploadImageFile(data)),
  uploadResumeFile: data => dispatch(uploadResumeFile(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProfile);
