import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from 'modules/dashboard';
import Users from 'modules/user';
import Login from 'modules/auth';
import Payments from 'modules/payments';
import Settings from 'modules/settings';

import Lab from 'lab';

const routes = [
  {
    path: '/',
    exact: true,
    component: Users,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/users',
    component: Users,
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/payments',
    exact: true,
    component: Payments,
  }
];

class AppRouter extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          {routes.map(({ exact, path, component, ...rest }, idx) => (
            <Route key={idx} exact={exact} path={path} component={component} {...rest} />
          ))}
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ items, auth }) => {
  let { isLoading, rows } = items;
  return { isLoading, rows };
};

export default withRouter(connect(mapStateToProps)(AppRouter));
