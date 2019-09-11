import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCurrentProfileAction } from "../../actions/profile";
import Spinner from '../layout/Spinner'

const Dashboard = ({ getCurrentProfileAction, auth: { user }, profile: { profile, loading } }) => {
	
	useEffect(() => {
		getCurrentProfileAction();
	});
	
	return (
		loading && profile === null ?
			<Spinner/>
			:
			<Fragment>
				<h1 className="large text-primary">Dashboard</h1>
				<p className="lead">
					<i className="fas fa-user"/>{ ' ' }
					Welcome { user && user.name }
				</p>
				{ profile !== null ?
					<Fragment>
						has
					</Fragment>
					:
					<Fragment>
						<p>You have not setup a profile, pleas add some info yet</p>
						<Link to='/create-profile' className="btn btn-primary my-1">
							Create Profile
						</Link>
					</Fragment> }
			</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfileAction: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfileAction })(Dashboard);