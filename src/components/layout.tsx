import { NextPage } from 'next'
import { ReactElement, useState } from "react";
import { useRouter } from "next/router";

import Header from '@/components/header'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'

interface LayoutProps {
    title: string,
    children: ReactElement | ReactElement[] 
}

const Layout: NextPage<LayoutProps> = ({title, children}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const router = useRouter();

    return (
        <>
            <Header title={title} />
            <div className="wrapper">
                <Sidebar collapsed={collapsed} href={router.asPath}  />
                <div className="main">
                    <Navbar collapsed={collapsed} setCollapsed={setCollapsed} username="Jhon Doe" />
                    <main className="content">
                        <div className="container-fluid p-0">

                            {children}
                            
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Layout