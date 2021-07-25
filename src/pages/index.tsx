import React from 'react'
import Layout from '@/components/layout'
import {withAuthPage} from 'src/util/withAuthPage'

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

export const getServerSideProps = withAuthPage(async (ctx, token) => {
    return {props: {token}}
});


export default Home