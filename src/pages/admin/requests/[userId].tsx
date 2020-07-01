import { TiArrowBack } from "react-icons/ti"
import { useEffect, useState } from "react"
import buildClient from "../../../service/build-client"
import { redirectClient } from "../../../service/redirect-client"

const userIdComponent = ({ data }) => {
	return (
		<div className='overlay'>
			<div className='container'>
				<h2>ID - {data.id}</h2>
				<h1>Name - {data.name}</h1>
				<h2>Role - {data.role}</h2>
				<h2>e-Mail - {data.email}</h2>
				<TiArrowBack onClick={() => {}} className='icon' />
				<div className='row'>
					<button className='btn--orange'>Reject</button>
					<button className='btn--blue'>Accept</button>
				</div>
			</div>
		</div>
	)
}

userIdComponent.getInitialProps = async (appContext) => {
	const { userId } = appContext.query
	try {
		const { data } = await buildClient(appContext).get(
			`/api/user/${userId}`
		)
		if (!data) throw new Error("no user found")
		console.log(data)
		return { data }
	} catch (error) {
		redirectClient(appContext)
	}
}

export default userIdComponent
