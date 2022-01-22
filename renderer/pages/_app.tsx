import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import store from '../store/index';
import { Fragment } from 'react';
import Script from 'next/script';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Fragment>
            <style jsx global>{`
                html {
                    height: 100%;
                    width: 100%;
                }
                body {
                    margin: 0;
                    height: 100%;
                    width: 100%;
                    font-family: Lato
                }
                div#__next {
                    height: 100%;
                    width: 100%;
                }
            `}</style>
            <Head>
                <meta
                    httpEquiv="Content-Security-Policy"
                    content="script-src 'self' 'unsafe-eval' https://apis.google.com"
                />
                <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet"></link>
            </Head>
            <Script src="https://apis.google.com/js/api.js" strategy='beforeInteractive' />
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </Fragment>
    );
}

export default MyApp;
