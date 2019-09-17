import axios from 'axios';
import { setAlertAction } from "./alert";

import { GET_POST, POST_ERROR, UPDATE_LIKES } from "./types";

//  Get posts
export const getPostAction = () => async dispatch => {
	try {
		const res = await axios.get('/api/posts');
		
		dispatch({
			type: GET_POST,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//  Add like
export const addlikeAction = id => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/like/${ id }`);
		
		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//  Remove like
export const removelikeAction = id => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/unlike/${ id }`);
		
		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
