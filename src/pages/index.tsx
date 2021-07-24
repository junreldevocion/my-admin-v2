import React from 'react'
import {GetServerSideProps} from 'next'
import Layout from '@/components/layout'
import {isLoggedIn} from 'src/util/auth'

interface HomeProps {
	token: string
}

const Home: React.FC<HomeProps> = ({ token }) => {
	return (
    	<>
			<Layout title="home" token={token}>
				<h1 className="h3 mb-3"><strong>Analytics</strong> Dashboard</h1>
			</Layout>
   		</>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookie = isLoggedIn(context?.req?.headers.cookie || '')

    // const user = api().get('api/user', { headers: {"Authorization" : `Bearer ${cookie.token}`} });

    // const [userData] = await Promise.all([user]);
    
    if ( !cookie.isLoggedIn && !cookie.token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }


    return { props: JSON.parse(JSON.stringify(cookie)) };
}


export default Home