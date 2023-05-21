import { useState } from "react"
import YIPlogo from '../assets/logo.png'
import "./Login.scss"
import { apiPublicGateway } from "../services/apiGateway"
interface loginPostDataProps {
    email: string
    password: string
}
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
                    <button type="button" id="submitBtn" onClick={
                        () => {
                            const postData: loginPostDataProps = {
                                email: email,
                                password: password
                            }
                            apiPublicGateway.post("/api/v1/yip/login/", postData)
                                .then((res) => res.data)
                                .then((data) => {
                                    setErrorStatus(false)
                                    localStorage.setItem("accessToken", data.response.accessToken)
                                    window.location.replace("/school-dashboard")
                                })
                                .catch((err) => {
                                    setErrorStatus(true)
                                    console.error(err)
                                })
                        }
                    }>
                        Login
                    </button>
                    {errorStatus ? <ErrorBox /> : <></>}
                </form>
            </div>
        </div >
    )
}

const ErrorBox = () => {
    return (
        <div id="login-error" className="login-error">
            <p>Incorrect Username or Password!!!</p>
        </div>
    )
}

export default Login