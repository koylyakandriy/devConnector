import axios from 'axios';

import { setAlertAction } from './alert';
import {
	REGISTRATION_SUCCESS,
	REGISTRATION_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//  Load User
export const loadUserAction = () => async dispatch => {
	if (localStorage.token) {
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
		
		dispatch(loadUserAction());
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

//  login User
export const loginAction = (email, password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	
	const body = JSON.stringify({ email, password });
	
	try {
		const res = await axios.post('/api/auth', body, config);
		
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});
		
		dispatch(loadUserAction());
	} catch (err) {
		const errors = err.response.data.errors;
		
		if (errors) {
			errors.forEach(error => dispatch(setAlertAction(error.msg, 'danger')));
		}
		
		dispatch({
			type: LOGIN_FAIL
		})
	}
};

export const logoutAction = () => dispatch => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};