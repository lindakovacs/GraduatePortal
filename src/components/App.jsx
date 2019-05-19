import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import NavBarContainer from "./NavBar/NavBarContainer";
import Footer from "./Footer/Footer";
import LoginContainer from "./Login/LoginContainer";
import SearchContainer from "./Search/SearchContainer";
import ViewProfileContainer from "./ViewProfile/ViewProfileContainer";
import NewProfileContainer from "./NewProfile/NewProfileContainer";
import EditProfileContainer from "./EditProfile/EditProfileContainer";
<<<<<<< HEAD
import NewUsersContainer from "./CreateNewUsers/NewUsersContainer";
import Modal from "./Modal";
=======
import RegistrationContainer from "./Registration/RegistrationContainer";
>>>>>>> 9d696595951c31ab700a5fbd43de828b36d345ca

function App() {
  return (
    <div>
      <Route path="/" component={NavBarContainer} />
      <Switch>
        <Route exact path="/" component={SearchContainer} />
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/profile/add" component={NewProfileContainer} />
        <Route
          exact
          path="/profile/:graduateId/edit"
          component={EditProfileContainer}
        />
        <Route
          exact
          path="/profile/:graduateId"
          component={ViewProfileContainer}
        />
<<<<<<< HEAD
        <Route exact path="/newusers" component={NewUsersContainer} />
=======
        <Route path="/register" component={RegistrationContainer} />
>>>>>>> 9d696595951c31ab700a5fbd43de828b36d345ca
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
