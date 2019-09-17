import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { getPostAction } from '../../actions/post';
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = ({ getPostAction, post: { posts, loading } }) => {
	useEffect(() => {
		getPostAction();
	}, [ getPostAction ]);
	
	return loading ?
		<Spinner/> :
		<Fragment>
			<h1 className="large text primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user"/> Welcome to the community
			</p>
			
			{/*{PostForm}*/ }
			
			<div className="posts">
				{ posts.map(post => (
					<PostItem key={ post._id } post={ post }/>
				)) }
			</div>
		</Fragment>;
};

Posts.propTypes = {
	getPostAction: PropTypes.func,
	post: PropTypes.object
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPostAction })(Posts);