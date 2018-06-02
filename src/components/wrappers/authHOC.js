import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import axios from 'axios';

export default function(ComposedComponent) {
  class authHOC extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {   
      if (!this.props.authenticated) {
        this.context.router.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!this.props.authenticated) {
        this.context.router.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.user };
  }

  return connect(mapStateToProps)(authHOC);
}