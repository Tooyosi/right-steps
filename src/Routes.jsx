import React, { Fragment, Component } from 'react'
import { Router, Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Landing from './Landing';
import { ErrorProvider, UserListProvider, ReferralLiinkProvider, MemberIdProvider } from './component/Context/Context';
import { Signup } from './registeration/Signup';
import { Login } from './registeration/Login';
import { Dashboard } from './component/dashboard/Dashboard';
import { Stages } from './component/Stages/Stages';
import { MembersPage } from './component/members/MembersPage';
import { Balance } from './component/balance/Balance';
import { Referral } from './component/referral/Referral';
import { TransactionsPage } from './component/transactions/Transactions';
import { Settings } from './component/settings/Settings';



const Routes = () => (
  <ErrorProvider>
    <UserListProvider>
      <ReferralLiinkProvider>
        <MemberIdProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Landing}></Route>
              <Route exact path="/signup" component={Signup}></Route>
              <Route exact path="/signin" component={Login}></Route>
              <Route exact path="/dashboard" component={Dashboard}></Route>
              <Route exact path="/stages" component={Stages}></Route>
              <Route exact path="/members" component={MembersPage}></Route>
              <Route exact path="/balance" component={Balance}></Route>
              <Route exact path="/settings" component={Settings}></Route>
              <Route exact path="/transactions" component={TransactionsPage}></Route>
              <Route exact path="/referral/:id" component={Referral}></Route>
            </Switch>
          </BrowserRouter>
        </MemberIdProvider>
      </ReferralLiinkProvider>
    </UserListProvider>
  </ErrorProvider>
);

export default Routes;