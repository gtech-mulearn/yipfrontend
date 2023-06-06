import { useState } from "react"
import YIPlogo from '../../../assets/logo.webp'
import ErrorBox from "../components/ErrorBox/ErrorBox"
import { login } from "../services/apis"
import './Login.scss'

function Reset() {
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState("")
    const [user, setUser] = useState('')
    return (
        <div className="login-background">
            <div className="login-container">
                <img src={YIPlogo} alt="YIP-Logo" />
                <h2>Set  new Password</h2>
                <p>{user} reset your password</p>
                <form>

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
                    </div>
                    <button type="button" id="submitBtn" onClick={
                        () => login(email, password, setErrorStatus)}
                    >
                        Reset Password
                    </button>
                    {errorStatus ? <ErrorBox /> : <></>}
                </form>
            </div>
        </div >
    )
}
export default Reset