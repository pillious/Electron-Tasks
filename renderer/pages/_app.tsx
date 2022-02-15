import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import store from "../store/index";
import { Fragment } from "react";
import Script from "next/script";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Fragment>
            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    font-family: Lato;
                }
                html,
                body,
                div#__next {
                    height: 100%;
                    width: 100%;
                    font-size: 18px;
                }
            `}</style>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width" />
                <meta
                    httpEquiv="Content-Security-Policy"
                    content="script-src 'self' 'unsafe-eval' https://apis.google.com"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>
            <Script
                src="https://apis.google.com/js/api.js"
                strategy="beforeInteractive"
            />
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </Fragment>
    );
}

export default MyApp;
