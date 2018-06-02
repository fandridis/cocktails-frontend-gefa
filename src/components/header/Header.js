import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class Header extends Component {
  // Show different things depending of log in status
  renderContent() {
    switch (this.props.user) {
      case null:
        return;  // Show nothing until I know if user is logged in or not
      case false:
        return (
          <li><a href="/auth/google">Log in with Google</a></li>
        );
      default:
        return (
          <li onClick={this.loggedOutClicked.bind(this)}><a href="/api/logout">Logout</a></li>
        )
    }
  }

  loggedOutClicked() {
    console.log('Logged out was clicked! Props: ', this.props);
    this.props.unsetLocalStorageIsUser();
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/dashboard' : '/'}
            className="left brand-logo" >Tourney
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// Make the state (or part of it) accessible to this component as props (this.props.XXX)
function mapStateToProps({ user }) {
  return { user };
}

// Similar with above without ES6
// function mapStateToProps(state) {
//  return { auth: state.auth };
// }

// Connect the component Header so it can access the state
export default connect(mapStateToProps, actions)(Header);