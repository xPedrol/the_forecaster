import type {AppProps} from 'next/app';
import {ChakraProvider} from '@chakra-ui/react';
import theme from "../config/theme";
import {QueryClientProvider} from 'react-query';
import queryClient from "../config/queryClient";


function MyApp({Component, pageProps}: AppProps) {
    return <>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </QueryClientProvider>
    </>;
}

export default MyApp;
