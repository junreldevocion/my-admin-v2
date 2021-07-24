
import router from 'next/router'
import Cookies from 'js-cookie'
import cookie from 'cookie'

export const isLoggedIn = (reqCookies : string = "") => {
    // if we don't have request cookies, get the cookie from client
    if (! reqCookies) {

        return {
            isLoggedIn: !! Cookies.get('is_user_logged_in'),
            token: Cookies.get('token')
        };
    }

    return {
        isLoggedIn: !! cookie.parse(reqCookies).is_user_logged_in,
        token: cookie.parse(reqCookies).token
    };
}

export const logIn = ( token : string, user_me : string) => {
    Cookies.set('token', token, {expires: 86400, sameSite: 'lax'})
    Cookies.set('user_me', user_me, {expires: 86400, sameSite: 'lax'})
    Cookies.set('is_user_logged_in', "true", {expires: 86400, sameSite: 'lax'})

    router.push('/')
}

export const logOut = () => {
    if (typeof window !== 'undefined') {
        // remove logged in user's cookie and redirect to login page
        Cookies.remove('is_user_logged_in', {expires: 86400, sameSite: 'lax'})
        Cookies.remove('token', {expires: 86400, sameSite: 'lax'})
        Cookies.remove('user_me', {expires: 86400, sameSite: 'lax'})

        router.push('/login')
        
    }
}