
import {AppProvider} from '../context/appContext'
import {CookiesProvider } from 'react-cookie'
import '@/styles/css/globals.css'
import '@/styles/scss/app.scss'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CookiesProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </CookiesProvider>
    </>
  )
}
export default MyApp
