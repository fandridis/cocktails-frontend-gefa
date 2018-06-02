
// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the landing page.

import React from 'react'
import { Redirect, Route, withRouter } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  let isLoggedIn = false;
  if (rest.authStatus) { isLoggedIn = rest.authStatus._id; }

  return (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)};

// Connect the component Header so it can access the state
export default withRouter(PrivateRoute);
