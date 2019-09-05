import axios from 'axios';

const setAuthToken = token => {
	console.log('TOKEN:');
	if (token) {
		console.log('IFTOKEN:');
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;