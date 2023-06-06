import { useState } from "react"
import YIPlogo from '../../../assets/logo.webp'
import ErrorBox from "../components/ErrorBox/ErrorBox"
import { login } from "../services/apis"
import './Login.scss'

function Login() {
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState("")
    return (
        <div className="login-background">
            <div className="login-container">
                <img src={YIPlogo} alt="YIP-Logo" />
                <h2>Login</h2>
                <form>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Email ID"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password">
                        <div className="show-password">
                            <input
                                type="checkbox"
                                name="password"
                                id="showpass"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                            />
                            <label>Show Password</label>
                        </div>
                        {/* <label><a href="/reset-req-password">Reset Password?</a></label> */}
                    </div>
                    <button type="button" id="submitBtn" onClick={
                        () => login(email, password, setErrorStatus)}
                    >
                        Login
                    </button>
                    {errorStatus ? <ErrorBox /> : <></>}
                </form>
            </div>
        </div >
    )
}
export default Login