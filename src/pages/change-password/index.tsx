import React from 'react'
import Layout from '@/components/layout'
import {withAuthPage} from 'src/util/withAuthPage'

interface ChnagePasswordProps {
    token: string
}

const ChnagePassword: React.FC<ChnagePasswordProps> = ({token}) => { 
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
                                    <input type="password" name="oldpassword" className="form-control is-invalid" id="oldpassword"
                                        // onChange={updateFormInput}
                                    />
                                    <div id="oldpasswordFeedback" className="invalid-feedback">
                                        Please provide a valid city.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">New Password</label>
                                    <input type="password" name="password" className="form-control" id="password" 
                                        // onChange={updateFormInput}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                                    <input type="password" name="password_confirmation" className="form-control" id="password_confirmation"
                                        // onChange={updateFormInput}
                                    />
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" type="submit">Change Password</button>
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

export const getServerSideProps = withAuthPage(async (ctx, token) => {
    return {props: {token}}
});


export default ChnagePassword