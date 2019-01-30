import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import styled from "styled-components";

import Header from "../header";
import Search from "../search";
import Signout from "../auth/signout";
import BannedList from "../banned-list";
import BannedSubmitForm from "../banned-submit-form";
import requireAuth from "../require-auth";

import { getAuth } from "../../selectors";

const MainDiv = styled.div`
  max-width: 680px;
  margin: 0 auto;
  min-height: 100vh;
  overflow-x: hidden;
`;

function Main() {
  return (
    <MainDiv>
      <Header />
      <Route exact path="/app" component={BannedList} />
      <Route exact path="/app/youarebanned" component={BannedSubmitForm} />
      <Route exact path="/app/signout" component={Signout} />
      <Route exact path="/app/search" component={Search} />
    </MainDiv>
  );
}

const mapStateToProps = state => ({
  auth: getAuth(state)
});

export default connect(mapStateToProps)(requireAuth(Main));
