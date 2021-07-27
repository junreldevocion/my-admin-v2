import cookie from 'cookie'
import { GetServerSidePropsContext } from 'next'
import router from 'next/router';

export function parseCookies(ctx : GetServerSidePropsContext)  {
    return cookie.parse(ctx?.req ? ctx?.req?.headers.cookie || '' : "")
}

interface Cookies {
    [key: number] : {
        isLogged: boolean,
        token: string,
        user_me: string
    }
}

