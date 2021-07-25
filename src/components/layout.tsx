import { NextPage } from 'next'
import { ReactNode, useState } from "react";

import Header from '@/components/header'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'

interface LayoutProps {
    title: string,
    children: ReactNode;
    token: string 
}

const Layout: NextPage<LayoutProps> = ({title, children, token}) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <>
            <Header title={title} />
            <div className="wrapper">
                <Sidebar collapsed={collapsed}  />
                <div className="main">
                    <Navbar collapsed={collapsed} setCollapsed={setCollapsed} token={token} username="Jhon Doe" />
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