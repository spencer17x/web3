import axios from 'axios';

export const request = axios.create({
	baseURL: 'https://gmgn.ai'
});

request.interceptors.request.use(config => {
	return config;
});

request.interceptors.response.use(response => {
	if (response.status === 200) {
		if (response.data.code === 0) {
			return response.data.data;
		}

		console.error(response);
		return Promise.reject(
			new Error(`Internal server error, code: ${response.data.code}, message: ${response.data.message}`)
		);
	}

	console.error(response);
	return Promise.reject(new Error(`Http server error, status: ${response.status}, statusText: ${response.statusText}`));
}, error => {
	console.error(error);
	return Promise.reject(error);
});