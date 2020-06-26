import axios from 'axios';

export default ({ url, method, body, onSuccess, onError }) => {

	const doRequest = async () => {
		try {
			const response = await axios[method](url, body);
			if (onSuccess) {
				onSuccess(response.data);
			}
			return response.data;
		} catch (err) {
			const errors = err.response.data.errors;
			if (onError) {
				onError(errors)
			}
		}
	};

	return { doRequest };
}