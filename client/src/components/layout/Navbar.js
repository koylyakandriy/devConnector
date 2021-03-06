import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { logoutAction } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logoutAction }) => {
	const authLinks = (
		<ul>
			<li>
				<Link to="/profiles">Developers</Link>
			</li>
			<li>
				<Link to="/posts">Posts</Link>
			</li>
			<li>
				<Link to="/dashboard">
					<i className="fas fa-user"/>{ ' ' }
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to="/" onClick={ logoutAction }>
					<i className="fas fa-sign-out-alt"/>{ ' ' }
					<span className="hide-sm">Logout</span>
				</Link>
			</li>
		</ul>
	);
	
	const guestLinks = (
		<ul>
			<li><Link to="/profiles">Developers</Link></li>
			<li><Link to="/registration">Registration</Link></li>
			<li><Link to="/login">Login</Link></li>
		</ul>
	);
	
	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/"><i className="fas fa-code"/> DevConnector</Link>
			</h1>
			{ !loading && (
				<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
		</nav>
	);
};

Navbar.propTypes = {
	logoutAction: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutAction })(Navbar);