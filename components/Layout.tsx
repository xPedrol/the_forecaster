import {ReactNode} from "react";
import {Container} from "@chakra-ui/react";
import Head from "next/head";

type LayoutProps = {
    children: ReactNode;
    title: string;
}
const Layout = ({children, title}: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Container maxW={'7xl'}>
                {children}
            </Container>
        </>
    );
};
export default Layout;