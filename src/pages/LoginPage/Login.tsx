import React, { useState } from "react"
import YIPlogo from "../../assets/logo.png"
import "./Login.scss"
import { Link } from "react-router-dom"

function Login() {
  const [errorStatus, setErrorStatus] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")
  const [email, setEmail] = useState("")
  const [accessToken, setAccessToken] = useState("")

  const passHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const emailHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const passShowEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowPassword(event.target.checked)
  }

  const sendLogin = () => {
    const postData: any = {
      email: email,
      password: password,
    }
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    }
    console.log(postData)
    const createData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + `/api/v1/login/`,
          postOptions
        )
        console.log(response)
        const data = await response.json()
        console.log("response : ", data)
        if (data.statusCode === 400) {
          setErrorStatus(true)
        } else {
          setErrorStatus(false)
          window.location.replace("/school-dashboard")
        }
        localStorage.setItem("accessToken", data.response.accessToken)
      } catch (error) {
        console.error(error)
      }
    }
    createData()
    console.log("data send!!")
  }
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
            onChange={emailHandleChange}
          />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={passHandleChange}
          />
          <div className="show-password">
            <input
              type="checkbox"
              name="password"
              id="showpass"
              checked={showPassword}
              onChange={passShowEvent}
            />
            <label>Show Password</label>
          </div>
          {/* <Link 
                to={errorStatus?"":"/school-dashboard"}
                id="submitBtn" 
                type="button">Login</Link> */}
          <button type="button" id="submitBtn" onClick={() => sendLogin()}>
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
