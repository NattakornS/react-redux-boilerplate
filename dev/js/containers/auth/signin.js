import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import { Row, Col ,Button,FormControl,Icon} from 'react-bootstrap';


import PageError from '../statusCode_pageError';

const renderInputUsername = field =>
	<div className="form-group">
		<FormControl
			autoFocus={true}
			className="form-control"
			{...field.input}
			placeholder={field.placeholder}
			type={field.type}
		/>
		{field.meta.touched &&
			field.meta.error &&
			<span className="error">{field.meta.error}</span>}
	</div>
const renderInputPassword = field =>
	<div className="form-group">
		<FormControl
			className="form-control"
			{...field.input}
			placeholder={field.placeholder}
			type={field.type}
		/>
		{field.meta.touched &&
			field.meta.error &&
			<span className="error">{field.meta.error}</span>}
	</div>
const openNotificationWithIcon = (type, messageTitle, description) => {
	notification[type]({
		message: messageTitle,
		description: description,
	});
};

class Signin extends Component {

	constructor(props) {
		super(props);
		this.state = {
			click: false,
		}
	}
	componentWillMount() {
		// if (localStorage.getItem('token')) {
		// 	this.props.history.push('/nav');
		// }
	}


	handleFormSubmit({ email, password }) {
		this.props.signinUser({ email, password }, this.props.history);

	}
	render() {
		let getCurrentURL = window.location.hash.split('/');
		let url = [];
		for (let i = 0; i < getCurrentURL.length; i++) {
			if (getCurrentURL[i] !== '') {
				url[i] = getCurrentURL[i]
			}
		}

		if (url.length > 2 || (url.length === 2 && url[1] !== 'signin')) {
			return <PageError statusCode={404} />
		}

		const { handleSubmit } = this.props;
		const center = {
			margin: '0 !important',
			position: 'fixed',
			top: '50%',
			left: '50%',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		}
		const signinFont = {
			textTransform: 'uppercase',
			letterSpacing: '2px',
		}
		return (
			<div className="background__signin">
				<a href="https://www.freepik.com/free-photos-vectors/card">Card image created by Ijeab - Freepik.com</a>
				<div style={center}>
					<div className="card card__signin" >
						<h1 style={signinFont}>Sign In</h1>
						<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
							<Row>
								<Col xs={12} sm={12} md={12} >
									<div>
										<label htmlFor="email">Username : </label>
										<Field
											name="email"
											placeholder="Username"                   // Specify field name
											component={renderInputUsername}           // Specify render component above
											type="text" />
									</div>

									<div>
										<label htmlFor="password">Password : </label>
										<Field
											name="password"
											placeholder="Password"                  // Specify field name
											component={renderInputPassword}           // Reuse same render component
											type="password" />
									</div>
								</Col>
								<Col xs={12} sm={12} md={12} >
									<Button >Sign In</Button>
								</Col>
							</Row>
						</form>
					</div>
				</div>

			</div>


		);
	}
}
function mapsStateToProps(state) {
	return {
		errorMessage: state.auth.error,
		authenticated: state.auth.authenticated,
	}
}
// export default connect(null, actions)(reduxForm({ form: 'sigin', fields: ['email', 'password'] })(Signin));
// export default reduxForm({
// 	form: 'signin',
// 	fields: ['email','password']
// },null,{signinUser})(Signin);
const signInForm = reduxForm({
	// a unique name for the form
	form: 'signin'
})(Signin)
export default connect(mapsStateToProps, actions)(signInForm)