import React from 'react'
import Layout from '@/components/layout'

interface HomeProps {
	
}

const Home: React.FC<HomeProps> = ({  }) => {
	return (
    	<>
			<Layout title="home">
				<h1 className="h3 mb-3"><strong>Analytics</strong> Dashboard</h1>
			</Layout>
   		</>
  )
}

export default Home