import React from "react"
import Head from "next/head"

import { getRouteTitle } from "../title-hook"

import "../public/css/main.css"

import { checkAuthRoutes } from "../service/auth-route"
import buildClient from "../service/build-client"

const AppComponent = ({ Component, pageProps, currentUser, router }) => {
	return (
		<>
			<Head>
				<meta name='description' content='Creare.' />
				<title>{getRouteTitle(router.route)}</title>
			</Head>
			<Component
				{...pageProps}
				currentUser={currentUser}
				route={router.route}
			/>
		</>
	)
}

AppComponent.getInitialProps = async (appContext) => {
	let pageProps = {}
	const { data } = await buildClient(appContext.ctx).get(
		"/api/user/currentUser"
	)
	checkAuthRoutes(appContext.ctx, data.currentUser)

	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx)
	}
	console.log(data)
	return {
		pageProps,
		...data
	}
}

export default AppComponent
