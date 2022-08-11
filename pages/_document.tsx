// pages/_document.js

import {ColorModeScript} from '@chakra-ui/react';
import NextDocument, {Html, Head, Main, NextScript} from 'next/document';
import theme from "../config/Theme";

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={'true'}/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
                        rel="stylesheet"/>
                </Head>
                <body>
                {/* 👇 Here's the script */}
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}