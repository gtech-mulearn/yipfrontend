import { useState } from "react"
import YIPlogo from '../../../assets/logo.webp'
import ErrorBox from "../components/ErrorBox/ErrorBox"
import { login } from "../services/apis"
import './Login.scss'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { error, errorCheck, success, errorMessage } from "../../Dashboard/components/Toastify/ToastifyConsts"

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
                        <label><a href="/reset-req-password">Forgot Password?</a></label>
                    </div>
                    <button type="button" id="submitBtn" onClick={
                        () => login(email.trim(), password.trim(), setErrorStatus)}
                    >
                        Login
                    </button>
                    {errorStatus ? <ErrorBox /> : <></>}
                </form>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div >
    )
}
export default Login