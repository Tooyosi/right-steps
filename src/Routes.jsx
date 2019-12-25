import React, { Fragment, Component } from 'react'
import { Router, Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Landing from './Landing';
import { ErrorProvider, UserListProvider } from './component/Context/Context';
import { Signup } from './registeration/Signup';
import { Login } from './registeration/Login';
import { Dashboard } from './component/dashboard/Dashboard';
import { Stages } from './component/Stages/Stages';
import { MembersPage } from './component/members/MembersPage';
import { Balance } from './component/balance/Balance';



const Routes = () => (
  <ErrorProvider>
    <UserListProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/signin" component={Login}></Route>
          <Route exact path="/dashboard" component={Dashboard}></Route>
          <Route exact path="/stages" component={Stages}></Route>
          <Route exact path="/members" component={MembersPage}></Route>
          <Route exact path="/balance" component={Balance}></Route>
        </Switch>
      </BrowserRouter>
    </UserListProvider>
  </ErrorProvider>
);

export default Routes;