import axios from 'axios';

import { setAlertAction } from './alert';
import {
	REGISTRATION_SUCCESS,
	REGISTRATION_FAIL,
	USER_LOADED,
	AUTH_ERROR
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//  Load User
export const loadUserAction = () => async dispatch => {
	console.log('loadUserAction:');
	if (localStorage.token) {
		console.log('localStorage.token:', localStorage.token);
		setAuthToken(localStorage.token);
	}
	
	try {
		const res = await axios.get('/api/auth');
		
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

//  Registration User
export const registrationAction = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	
	const body = JSON.stringify({ name, email, password });
	
	try {
		const res = await axios.post('/api/users', body, config);
		
		dispatch({
			type: REGISTRATION_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		const errors = err.response.data.errors;
		
		if (errors) {
			errors.forEach(error => dispatch(setAlertAction(error.msg, 'danger')));
		}
		
		dispatch({
			type: REGISTRATION_FAIL
		})
	}
};