import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { dateSelected } from '../../actions/index';

export default function (ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps, nextState) {
      if (!nextProps.authenticated) {
        this.props.history.push('/signin');
      }
      if (nextProps.authenticated != this.props.authenticated) {

      }
    }

    render() {
      return (
        <div>
          <ComposedComponent {...this.props} />
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}