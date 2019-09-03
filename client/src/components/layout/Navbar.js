import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/"><i className="fas fa-code"/> DevConnector</Link>
			</h1>
			<ul>
				<li><Link to="/">Developers</Link></li>
				<li><Link to="/registration">Registration</Link></li>
				<li><Link to="/login">Login</Link></li>
			</ul>
		</nav>
	);
};

export default Navbar;