/*
    1. Could move the "else "login view" to a different file/component and import/render that component"
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as actions from '../../../actions';
// import { Redirect } from 'react-router-dom';

import './Landing.css';

class Landing extends Component {

  constructor(props) {
    super(props)
    console.log('Constructor @ Landing is running - props: ', this.props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="landing-main">
        <h1 className="landing__title">Landing Page</h1>
        <div className="landing__routes">
        <div className="landing__route"><Link to="/cocktails">Create Cocktail</Link></div>
        <div className="landing__route"><Link to="/ingredients">Create Ingredient</Link></div>
        </div>
      </div>
    )
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

// Connect the component so it can access the state
export default connect(mapStateToProps)(Landing);
