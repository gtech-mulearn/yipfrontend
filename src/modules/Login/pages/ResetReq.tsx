import { useState } from "react"
import YIPlogo from '../../../assets/logo.png'
import ErrorBox from "../components/ErrorBox/ErrorBox"
import { login } from "../services/apis"
import './Login.scss'
import { privateGateway, publicGateway } from "../../../services/apiGateway"
import { password } from "../../../services/urls"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { error, errorCheck, success, errorMessage } from "../../Dashboard/components/Toastify/ToastifyConsts"
function ResetReq() {
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    const [email, setEmail] = useState("")
    const [show, setShow] = useState(true)
    return (
        <div className="login-background">
            {show && <div className="login-container">
                <img src={YIPlogo} alt="YIP-Logo" />
                <h2>Reset Password </h2>
                <form>
                    <p>Email Id</p>
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
                        () => forgotPassword(email, () => setShow(false))}
                    >
                        Request Reset Password
                    </button>
                    {errorStatus ? <ErrorBox /> : <></>}
                </form>
            </div>}
            {!show && <div className="login-container">
                <img src={YIPlogo} alt="YIP-Logo" />
                <h4>Reset link sent to {email} </h4>
            </div>}
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
function forgotPassword(email: string, showSuccess: () => void) {
    publicGateway.post(password.forgotPassword, {
        email: email
    })
        .then(res => {
            success()
            showSuccess()
        })
        .catch(err => {
            errorMessage(err.response);
            errorCheck(err.response);
        })
}
export default ResetReq