import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavItem, Navbar, Nav, NavDropdown, MenuItem, Row, Col } from 'react-bootstrap';
import { fetchMessage } from '../actions/index';

class Header extends Component {

	constructor(props){
		super(props);
		this.state = {
			keyNav:"page1",
			navExpanded:false
		}
		this.handleNavSelect=this.handleNavSelect.bind(this);
		this.setNavExpanded=this.setNavExpanded.bind(this);
		this.closeNav=this.closeNav.bind(this);
	}
	componentWillMount() {
		if (this.props.authenticated) {
			this.props.fetchMessage("");
		}
	}

	handleNavSelect(keyNav) {
		this.setState({ keyNav });
		console.log(keyNav)
		this.props.history.push(`/${keyNav}`);
	}

	setNavExpanded(expanded) {
		this.setState({ navExpanded: expanded });
	}

	closeNav() {
		this.setState({ navExpanded: false });
	}

	renderAuthenticate() {
		if (this.props.authenticated) {
			return [
				<NavItem key={"signup"} eventKey={"signup"} className="Nav--Link">Sign Up</NavItem>,
				<NavItem key={"signin"} eventKey={"signout"} className="Nav--Link">Sign Out</NavItem>
			];
		} else {
			return (
				< NavItem key={"signin"} eventKey={"signin"} className="Nav--Link" > Sign In</NavItem >
			);
		}
	}

	renderMenu() {
		return [
			<NavItem key={"page1"} eventKey={"page1"} >Menu1</NavItem>,
			<NavItem key={"page2"} eventKey={"page2"} >Menu2</NavItem>,
			<NavItem key={"page3"} eventKey={"page3"} >Menu3</NavItem>
		];
	}

	render() {
		return (
			<div style={{ position: 'fixed', width: '100%', zIndex: '999' }}>
				<Navbar collapseOnSelect fluid>
					<Navbar.Header>
						<Navbar.Brand >
							<a>
								<img src="/logo.png" alt="logo" />
							</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav bsStyle="pills" stacked activeKey={this.state.keyNav} onSelect={this.handleNavSelect}>
							{this.renderMenu()}
						</Nav>
						<Nav pullRight onSelect={this.handleNavSelect}>
							{this.renderAuthenticate()}
						</Nav >
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps,{fetchMessage})(Header);