import React from 'react';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-native';

export default function requireAuthentication(Component) {

  class AuthenticatedContainer extends React.Component {
    render() {
      if (this.props.user) {
        return <Component {...this.props} />
      } else {
        return <Redirect to='/' />
      }

    }
  }

  function mapStateToProps(state) {
    return {
      user: state.logIn.isAuthenticated
    }
  }

  return connect(mapStateToProps)(AuthenticatedContainer);
}
