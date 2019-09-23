import axios from "axios";
import { setAlertAction } from "./alert";

import {
	CLEAR_PROFILE,
	DELETE_ACCOUNT,
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	GET_PROFILES,
	GET_REPOS
} from "./types";

//  Get current users profile
export const getCurrentProfileAction = () => async dispatch => {
	try {
		const res = await axios.get("/api/profile/me");

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get all profiles
export const getProfilesAction = () => async dispatch => {
	dispatch({ type: CLEAR_PROFILE });

	try {
		const res = await axios.get("/api/profile");

		dispatch({
			type: GET_PROFILES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get profile userId
export const getProfileByIdAction = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Get Github repos
export const getGithubReposAction = username => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/github/${username}`);

		dispatch({
			type: GET_REPOS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//  Create or update profile
export const createProfileAction = (
	formData,
	history,
	edit = false
) => async dispatch => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const res = await axios.post("/api/profile", formData, config);

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});

		dispatch(
			setAlertAction(edit ? "Profile Updated" : "Profile Created", "success")
		);

		if (!edit) {
			history.push("/dashboard");
		}
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlertAction(error.msg, "danger")));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//  Add Experience
export const addExperienceAction = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const res = await axios.put("/api/profile/experience", formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlertAction("Experience Added", "success"));

		history.push("/dashboard");
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlertAction(error.msg, "danger")));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//  Add Education
export const addEducationAction = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const res = await axios.put("/api/profile/education", formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlertAction("Education Added", "success"));

		history.push("/dashboard");
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlertAction(error.msg, "danger")));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//  Delete experience
export const deleteExperienceAction = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlertAction("Experience Removed", "success"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//  Delete education
export const deleteEducationAction = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		dispatch(setAlertAction("Education Removed", "success"));
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

// Delete account & profile
export const deleteAccountAction = () => async dispatch => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		try {
			await axios.delete("/api/profile");

			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: DELETE_ACCOUNT });

			dispatch(setAlertAction("Your account has been permanently deleted"));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			});
		}
	}
};
