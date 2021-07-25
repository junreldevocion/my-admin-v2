import { NextPage } from 'next'
import Head from 'next/head'

interface HeaderProps {
  title: string
}

const Header: NextPage<HeaderProps> = ({title}) => {
    
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Generated my admin" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    )
}

export default Header