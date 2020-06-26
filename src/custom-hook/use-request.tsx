import axios from "axios"

import React, { useState } from "react"

export default ({
	url,
	method,
	body,
	onSuccess,
	onError
}) => {
	const [error, setError] = useState(null)

	const doRequest = async () => {
		setError(null)
		try {
			const response = await axios[method](url, body)
			if (onSuccess) {
				onSuccess(response.data)
			}
			return response.data
		} catch (err) {
			const errors = err.response.data.errors
			if (onError) {
				onError(errors);
			}
		}
	}

	return { doRequest }
}
