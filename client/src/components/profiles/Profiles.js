import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Spinner from '../layout/Spinner';
import { getProfilesAction } from '../../actions/profile.js';
import ProfileItem from "./ProfileItem";

const Profiles = ({ getProfilesAction, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfilesAction();
	}, [ getProfilesAction ]);
	
	return (
		<Fragment>
			{ loading ?
				<Spinner/> :
				<Fragment>
					<h1 className='large text-primary'>Developers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop"/>{ ' ' }
						Browse and connect with developers
					</p>
					<div className="profiles">
						{ profiles.length > 0 ?
							(profiles.map(profile => (
								<ProfileItem key={ profile._id } profile={ profile }/>
							))) :
							<h4>No profiles found...</h4> }
					</div>
				</Fragment> }
		</Fragment>
	);
};

Profiles.propTypes = {
	getProfilesAction: PropTypes.func,
	profile: PropTypes.object
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfilesAction })(Profiles);