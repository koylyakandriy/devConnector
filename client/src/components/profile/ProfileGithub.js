import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { getGithubReposAction } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

const ProfileGithub = ({ getGithubReposAction, username, repos }) => {
	useEffect(() => {
		getGithubReposAction(username)
	}, [ getGithubReposAction, username ]);
	return (
		<div className='profile-github'>
			<h2 className="text-primary my-1">Github</h2>
			{ repos === null ? <Spinner/> : (
				repos.map(repo => (
					<div key={ repo.id } className='repo bg-white p-1 my-1'>
						<div>
							<h4>
								<Link to={ repo.html_url } target='_blank'
								      rel='noopener noreferr'>{ repo.name }</Link>
							</h4>
							<p>{ repo.description }</p>
						</div>
						<div>
							<ul>
								<li className="badge badge-primary">
									Stars: { repo.stargazers_count }
								</li>
								<li className="badge badge-dark">
									Watchers: { repo.watchers_count }
								</li>
								<li className="badge badge-light">
									Forks: { repo.forks_count }
								</li>
							</ul>
						</div>
					</div>
				))
			) }
		
		</div>
	);
};

ProfileGithub.propTypes = {
	repos: PropTypes.array,
	getGithubReposAction: PropTypes.func,
	username: PropTypes.string
};

const mapStateToProps = state => ({
	repos: state.profile.repos
});

export default connect(mapStateToProps, { getGithubReposAction })(ProfileGithub);