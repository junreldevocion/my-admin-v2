import cookie from 'cookie'
import { GetServerSidePropsContext } from 'next'
import router from 'next/router';

export function parseCookies(ctx : GetServerSidePropsContext)  {
    return cookie.parse(ctx?.req ? ctx?.req?.headers.cookie || '' : "")
}

// export function setCookies(setCookie: Function, value: string|object|boolean, options: object, isLogged: boolean) {
//     if (isLogged) {
//         setCookie(value, options);
//         router.push('/');
//     }
// }

