import React from 'react';

import { checkAuthRoutes } from '../service/auth-route'

const AppComponent = ({ Component, pageProps }) => {
    return (
        <>
            <Component {...pageProps} />
        </>
    );
}

AppComponent.getInitialProps = async (appContext) => {
    let pageProps = {};
    // this will be updated once basic auth routes are setup
    const currentUser = undefined;
    checkAuthRoutes(appContext.ctx, currentUser)

    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
        pageProps
    }
}

export default AppComponent;