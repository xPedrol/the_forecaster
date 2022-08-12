import {extendTheme, ThemeConfig} from "@chakra-ui/react";

const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    },
};
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
};
const fonts = {
    body: 'Roboto Condensed, sans-serif',
    heading: 'Roboto Condensed, sans-serif',
};
const theme = extendTheme({config, colors, fonts});
export default theme;