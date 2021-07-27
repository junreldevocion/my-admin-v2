import React from 'react'
import Layout from '@/components/layout'
import { withAuthPage } from 'src/util/withAuthPage'
import api from 'src/util/api'
import { useState } from 'react'

interface ChnagePasswordProps {
    token: string
}

const ChnagePassword: React.FC<ChnagePasswordProps> = ({token}) => { 

    const [formInput, setFormInput] = useState<Object>({password_old: '', password: '', password_confirmation: ''});
    const [passwordOldErr, setPasswordOldErr] = useState<string>('')
    const [passwordErr, setPasswordErr] = useState<string>('')
    const [passwordConrimErr, setPassworConfirmdErr] = useState<string>('')

    const updateFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        setFormInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const submitFormInput = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        api().post('api/update_password', formInput, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            setPasswordOldErr('')
            setPassworConfirmdErr('')
            setPassworConfirmdErr('')
            if (error.response.status === 422) {
                console.log(error.response.data);
                if (typeof error.response.data.errors.password_old !== 'undefined') {
                    setPasswordOldErr(error.response.data.errors.password_old[0])
                }

                if (typeof error.response.data.errors.password !== 'undefined') {
                    setPasswordErr(error.response.data.errors.password[0])
                }

                if (typeof error.response.data.errors.password_confirmation !== 'undefined') {
                    setPassworConfirmdErr(error.response.data.errors.password_confirmation[0])
                }
            }
        })
    }
    
    return (
        <>
            <Layout title="Change password" token={token}>
                <h1 className="h3 mb-3">Change Password</h1>
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title mb-0"></h5>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="oldpassword" className="form-label">Old Password</label>
                                        <input type="password" name="password_old" className={`form-control ${!! passwordOldErr ? 'is-invalid' : ''}`} id="oldpassword"
                                            onChange={updateFormInput}
                                        />
                                        <div id="oldpasswordFeedback" className={`${!! passwordOldErr ? 'invalid-feedback' : ''}`}>
                                            {passwordOldErr}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">New Password</label>
                                        <input type="password" name="password" className={`form-control ${!! passwordErr ? 'is-invalid' : ''}`} id="password" 
                                            onChange={updateFormInput}
                                        />
                                        <div id="passwordFeedback" className={`${!! passwordErr ? 'invalid-feedback' : ''}`}>
                                            {passwordErr}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                                        <input type="password" name="password_confirmation" className={`form-control ${!! passwordConrimErr ? 'is-invalid' : ''}`} id="password_confirmation"
                                            onChange={updateFormInput}
                                        />
                                        <div id="passwordConfirmFeedback" className={`${!! passwordConrimErr ? 'invalid-feedback' : ''}`}>
                                            {passwordConrimErr}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button onClick={submitFormInput} className="btn btn-primary" type="submit">Change Password</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export const getServerSideProps = withAuthPage(async (ctx, {token}) => {
    return {props: {token}}
});


export default ChnagePassword