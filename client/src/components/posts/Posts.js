import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPostsAction } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getPostsAction, post: { posts, loading } }) => {
	useEffect(() => {
		getPostsAction();
	}, [getPostsAction]);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome to the community
			</p>

			<PostForm />

			<div className="posts">
				{posts.map(post => (
					<PostItem key={post._id} post={post} />
				))}
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	getPostsAction: PropTypes.func,
	post: PropTypes.object
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(
	mapStateToProps,
	{ getPostsAction }
)(Posts);