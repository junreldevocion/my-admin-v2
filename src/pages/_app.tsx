
import {AppProvider} from '../context/appContext'
import '@/styles/css/globals.css'
import '@/styles/scss/app.scss'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}
export default MyApp
