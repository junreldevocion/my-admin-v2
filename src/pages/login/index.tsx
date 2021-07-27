import React, {useState} from 'react'
import { GetServerSideProps  } from 'next'
import Head from 'next/head'
import { useCookies } from 'react-cookie'

import Styles from '@/styles/css/login.module.css'
import api from 'src/util/api'
import { parseCookies } from 'src/util/cookie'
import router from 'next/router'

interface LoginProps {
    data: object
}

const Login: React.FC<LoginProps> = (data) => {

    const [cookie, setCookie] = useCookies(['isLogged', 'token'])

    const [formInput, setFormInput] = useState<object>({email:'', password:''});
    const [errorEmail, setErrorEmail] = useState<string>('');
    const [errorPassword, setErrorPassword] = useState<string>('');
    const [badCredsError, setBadCredsError] = useState<string>('');


    const updateFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const submitFormInput = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api().get('sanctum/csrf-cookie').then(() => {
            api().post('api/login', formInput)
            .then(response => {
                
                if (response.status === 201) {
                    setCookie('isLogged',  true, {maxAge: 86400, sameSite: 'lax'})
                    setCookie('token', response.data.token, {maxAge: 86400, sameSite: 'lax'})
                    setCookie('user_me', response.data.token, {maxAge: 86400, sameSite: 'lax'})
                    
                    router.push('/')
                }

            })
            .catch(error => {
                setErrorEmail('')
                setErrorPassword('')
                setBadCredsError('')
                if (error.response.status === 422) {
                    if (typeof error.response.data.errors.email !== 'undefined') {
                        setErrorEmail(error.response.data.errors.email[0])
                    }
                    if (typeof error.response.data.errors.password !== 'undefined') {
                        setErrorPassword(error.response.data.errors.password[0])
                    }
                    if (typeof error.response.data.errors.message !== 'undefined') {
                        setBadCredsError(error.response.data.errors.message[0])
                    }
                }
                
            })
        })
        
    }

  return (
    <>
        <Head>
            <title>Login</title>
            <meta name="description" content="Sign in here" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="d-flex justify-content-center align-items-center min-vh-100 text-center">
            <div className={`${Styles.form_signin}`}>
                <form>
                    <h1 className="align-middle fs-1 fw-bold py-2"><span className="text-primary">My</span>Admin</h1>
                    <hr />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <div className={`alert alert-danger ${ !! !badCredsError ? 'd-none' : ''}`}>
                        {badCredsError}
                    </div>
                    <div className="form-floating text-start">
                        <input type="email" className={`form-control ${ !!errorEmail || !!badCredsError ? 'is-invalid' : ''}`} name="email" required id="floatingInput" 
                        placeholder="name@example.com" 
                        onChange={updateFormInput}
                        />
                        <div className={`py-2 ${ !!errorEmail ? 'invalid-feedback' : ''}`}>
                            {errorEmail}
                        </div>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating text-start">
                        <input type="password" className={`form-control ${ !!errorPassword || !!badCredsError ? 'is-invalid' : ''}`} name="password" id="floatingPassword" 
                        placeholder="Password" 
                        onChange={updateFormInput}
                        />
                        <div className={`py-2 ${ !!errorPassword ? 'invalid-feedback' : ''}`}>
                            {errorPassword}
                        </div>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button name="login" onClick={submitFormInput}  className="w-100 btn btn-lg btn-primary text-light py-2" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2021–2021</p>
                </form>
            </div>
        </div>
        </>
  )
}

export const getServerSideProps: GetServerSideProps  = async (ctx) => {

    const cookie = parseCookies(ctx);

    if ( !! cookie.isLogged  && !! cookie.token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return { props: cookie };
}

export default Login