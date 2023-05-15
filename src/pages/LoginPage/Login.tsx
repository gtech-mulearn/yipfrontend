import { useState } from "react"
import YIPlogo from "../../assets/logo.png"
import "./Login.scss"
import { passHandleChange, emailHandleChange, passShowEvent, sendLogin } from "../../service/LoginService"
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
            onChange={(e) => emailHandleChange(e, setEmail)}
          />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => passHandleChange(e, setPassword)}
          />
          <div className="show-password">
            <input
              type="checkbox"
              name="password"
              id="showpass"
              checked={showPassword}
              onChange={(e) => passShowEvent(e, setShowPassword)}
            />
            <label>Show Password</label>
          </div>

          <button type="button" id="submitBtn" onClick={() => sendLogin(email, password, setErrorStatus)}>
            Login
          </button>
          {errorStatus ? <ErrorBox /> : <></>}
        </form>
      </div>
    </div>
  )
}

const ErrorBox = () => {
  return (
    <div id="login-error" className="login-error">
      <p>Error: Login Failed!</p>
    </div>
  )
}

export default Login
