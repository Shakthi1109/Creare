import React from "react"
import "../public/css/main.css"

import { checkAuthRoutes } from "../service/auth-route"
import buildClient from "../service/build-client"

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<>
			<Component {...pageProps} current={currentUser} />
		</>
	)
}

AppComponent.getInitialProps = async (appContext) => {
	let pageProps = {}
	const { data } = await buildClient(appContext.ctx).get(
		"/api/user/currentUser",
	)
	checkAuthRoutes(appContext.ctx, data.currentUser)

	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx)
	}
	console.log(data)
	return {
		pageProps,
		...data,
	}
}

export default AppComponent
