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
                <meta name="description" content={'This project is an app to get forecast of cities around the world'}/>
                <link rel="icon" type="image/png" href="/images/project_icon.png"/>
                <title>{title}</title>
            </Head>
            <Container maxW={'7xl'} width={'100%'}>
                {children}
            </Container>
        </>
    );
};
export default Layout;