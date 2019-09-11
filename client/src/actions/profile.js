import axios from 'axios';
import { setAlertAction } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

//  Get current users profile
export const getCurrentProfileAction = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me');
		
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//  Create or update profile
export const createProfileAction = (formData, history, edit = false) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		
		const res = await axios.post('/api/profile', formData, config);
		
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
		
		dispatch(setAlertAction(edit ? 'Profile Updated' : 'Profile Created', 'success'));
		
		if (!edit) {
			history.push('/dashboard')
		}
	} catch (err) {
		const errors = err.response.data.errors;
		
		if (errors) {
			errors.forEach(error => dispatch(setAlertAction(error.msg, 'danger')));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};