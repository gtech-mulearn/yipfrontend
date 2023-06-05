import { useState } from "react"
import YIPlogo from '../../../assets/logo.png'
import ErrorBox from "../components/ErrorBox/ErrorBox"
import { login } from "../services/apis"
import './Login.scss'

function ResetReq() {
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    const [email, setEmail] = useState("")
    return (
        <div className="login-background">
            <div className="login-container">
                <img src={YIPlogo} alt="YIP-Logo" />
                <h2>Reset</h2>
                <h5>{'User email Id here'}</h5>
                <form>
                    <p>New Password</p>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Enter your Email ID"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="password">
                        <label><a href="/">Login using Password?</a></label>
                    </div>
                    <button type="button" id="submitBtn" onClick={
                        () => { }}
                    >
                        Request Reset Password
                    </button>
                    {errorStatus ? <ErrorBox /> : <></>}
                </form>
            </div>
        </div >
    )
}
export default ResetReq