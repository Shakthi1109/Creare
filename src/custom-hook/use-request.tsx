import axios from "axios"

import React, { useState } from "react"

export default ({
	url,
	method,
	body,
	onSuccess,
}: {
	url: any
	method: any
	body?: any
	onSuccess: any
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
			setError(
				<ul>
					{errors.map((error) => (
						<li key={error.message}>{error.message}</li>
					))}
				</ul>,
			)
			return errors
		}
	}

	return { doRequest, error }
}
