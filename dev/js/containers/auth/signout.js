import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import { Row, Col } from 'react-bootstrap';

import SignIn from './signin';

class Signout extends Component {

	componentWillMount() {
		this.props.signoutUser();
	}
	render() {
		return (
			<div>
			{
				this.props.history.push('/signin')
			}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(null, actions)(Signout);