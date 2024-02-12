import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
    return (
        <Html>
            <Head>
                <link
                    href='https://fonts.googleapis.com/css2?family=Lato&display=swap'
                    rel='stylesheet'
                ></link>
            </Head>
            <body>
                <Main />
                <NextScript />
                <div id='modal-root'></div>
            </body>
        </Html>
    );
};

export default Document;
