import { useState, useEffect } from "react"
import YIPlogo from '../../../assets/logo.webp'
import ErrorBox from "../components/ErrorBox/ErrorBox"
import { login } from "../services/apis"
import './Login.scss'
import { NavigateFunction, useNavigate, useParams } from "react-router-dom"
import { publicGateway } from "../../../services/apiGateway"
import { password } from "../../../services/urls"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { error, errorCheck, success, errorMessage } from "../../Dashboard/components/Toastify/ToastifyConsts"

function Reset() {
    const navigate = useNavigate()
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState("")
    const [user, setUser] = useState('')
    const [token, setToken] = useState('')
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search)
        const tokenVal = searchParams.get('token')
        setToken(tokenVal as string)
    }, [])
    return (
        <div className="login-background">
            <div className="login-container">
                <img src={YIPlogo} alt="YIP-Logo" />
                <h2>Set New Password</h2>
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
                        () => resetPassword(token, password, navigate)}
                    >
                        Reset Password
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
function resetPassword(id: string, passwordVal: string, navigate: NavigateFunction) {
    publicGateway.post(`${password.resetPassword}${id}/`, { password: passwordVal })
        .then(res => {
            success()
            setTimeout(() => {
                navigate('/')
            }, 2000);
        })
        .catch(err => {
            errorMessage(err.response);
            errorCheck(err.response);
        })
}
export default Reset