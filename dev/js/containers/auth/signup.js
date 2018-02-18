import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import { Row, Col, ButtonToolbar, Dropdown, DropdownButton, MenuItem, FormControl , Button, Icon } from 'react-bootstrap';
const dropdownTitle = ["customer", "admin"];


const renderInput = field =>
	<div className="form-group">
		<FormControl placeholder={field.placeholder} className="form-control" {...field.input} type={field.type} />
		{field.meta.touched &&
			field.meta.error &&
			<span className="error">{field.meta.error}</span>}
	</div>

const dropdownRole = field =>
	<div className="form-group">
		<select placeholder={field.placeholder} {...field.input}>
			{field.children}
		</select>
		{field.meta.touched &&
			field.meta.error &&
			<span className="error">{field.meta.error}</span>}
	</div>

class Signup extends Component {

	handleFormSubmit({ email, password, role }) {
		this.props.signupUser({ email, password, role });
	}

	renderDropdown() {
		return (
			<Field name="role"
				component={dropdownRole}
			>
				{dropdownTitle.map(title => {
					return <option key={title} value={title}>{title}</option>
				})}
			</Field>
		);
	}


	render() {
		const { handleSubmit } = this.props;
		return (
			<Row style={{ paddingBottom: 100 }}>
				<Col xs={8} sm={6} md={6} xsOffset={2} smOffset={3} mdOffset={3} >
					<h1>Sign Up</h1>
					<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
						<div>
							<label htmlFor="email">Email:</label>
							<Field
								name="email"                   // Specify field name
								component={renderInput}           // Specify render component above
								type="email"
								placeholder='Your email'
								icon='mail'
							/>
						</div>

						<div>
							<label htmlFor="password">Password:</label>
							<Field
								name="password"                   // Specify field name
								component={renderInput}           // Reuse same render component
								type="password"
								placeholder='Your password'
								icon='lock'
							/>
						</div>
						<div>
							<label htmlFor="password">Retype Password:</label>
							<Field
								name="passwordConfirm"                   // Specify field name
								component={renderInput}           // Reuse same render component
								type="password"
								placeholder='Your confirm password'
								icon='lock'
							/>
						</div>
						<div>
							<label htmlFor="role">Role:</label>
							{this.renderDropdown()}
						</div>
						<div>
							<Button>Sign Up</Button>
						</div>
					</form>
				</Col>
			</Row>
		);
	}
}
function validate(formProps) {
	const errors = {};
	if (!formProps.email) {
		errors.email = "Please enter an email";
	}
	if (!formProps.password) {
		errors.password = "Please enter an password";
	}
	if (!formProps.passwordConfirm) {
		errors.passwordConfirm = "Please enter an retype password";
	}
	if (formProps.password !== formProps.passwordConfirm) {
		errors.password = "Password not match"
		errors.passwordConfirm = "Password not match";
	}
	if (!formProps.role) {
		errors.role = "Please select user role"
	}
	return errors;
}

function mapsStateToProps(state) {
	return { errorMessage: state.auth.error }
}
// export default connect(null, actions)(reduxForm({form: 'sigin', fields: ['email', 'password'] })(Signin));
// export default reduxForm({
// 	form: 'signin',
// 	fields: ['email','password']
// },null,{signinUser})(Signin);
const signUpForm = reduxForm({
	// a unique name for the form
	form: 'signup',
	validate
})(Signup)
export default connect(mapsStateToProps, actions)(signUpForm)

