import axios from 'axios';

export const request = axios.create({
	baseURL: 'https://api.dexscreener.com'
});

request.interceptors.request.use(config => {
	return config;
});

request.interceptors.response.use(response => {
	if (response.status === 200) {
		return response.data;
	}

	console.error(response);
	return Promise.reject(new Error(`Http server error, status: ${response.status}, statusText: ${response.statusText}`));
}, error => {
	console.error(error);
	return Promise.reject(error);
});