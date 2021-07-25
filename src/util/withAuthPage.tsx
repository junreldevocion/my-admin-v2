import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import {isLoggedIn} from 'src/util/auth'

type User = {
  isLoggedIn: boolean
  token: string | undefined
}

type WithAuthServerSidePropsResult = GetServerSidePropsResult<{[key:string] : any}>

type Incoming<P> = (a: GetServerSidePropsContext, user: User) => Promise<P>;  

export const withAuthPage = (incoming?: Incoming<WithAuthServerSidePropsResult> | null) => {
  return async (context: GetServerSidePropsContext): Promise<WithAuthServerSidePropsResult> => {
    const cookie = isLoggedIn(context?.req?.headers.cookie || '');

    if ( !cookie.isLoggedIn && !cookie.token) {
      return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
      }
    }

    if (incoming) {
      
      const incomingResult = await incoming(context, {isLoggedIn: cookie.isLoggedIn, token: cookie.token})

      if ('props' in incomingResult) {
        return { props: { ...incomingResult.props, cookie } };
      }

      if ('redirect' in incomingResult) {
        return { redirect: { ...incomingResult.redirect } };
      }

      if ('notFound' in incomingResult) {
        return { notFound: incomingResult.notFound };
      }

    }

    return {
      props: {cookie} 
    }
  }
} 