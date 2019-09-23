import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addPostAction } from "../../actions/post";

const PostForm = ({ addPostAction }) => {
	const [text, setText] = useState("");

	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Say Something...</h3>
			</div>
			<form
				onSubmit={e => {
					e.preventDefault();
					addPostAction({ text });
					setText("");
				}}
				className="form my-1"
			>
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="Create a post"
					value={text}
					onChange={e => setText(e.target.value)}
					required
				/>
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	);
};

PostForm.propTypes = {
	addPostAction: PropTypes.func.isRequired
};

export default connect(
	null,
	{ addPostAction }
)(PostForm);
