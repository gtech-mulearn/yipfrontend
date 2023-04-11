import React,{useState} from 'react'
import YIPlogo from '../../assets/logo.png'
import './Login.scss'
import { Link } from 'react-router-dom'

function Login() {
  const [errorStatus,setErrorStatus] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")

  const passHandleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value)
  }

  const passShowEvent = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setShowPassword(event.target.checked)
  }
  return (
    <div className="login-background">
      <div className='login-container'>
        <img src={YIPlogo} alt="YIP-Logo"/>
          <h2>Login</h2>
          <form>
              <input id="username" name="username" type="text" placeholder="User ID"/>
              <input id="password" name="password" type={showPassword?"text":"password"} placeholder="Password" onChange={passHandleChange}/>
              <div className="show-password">
                  <input type="checkbox" name="password" id="showpass" checked={showPassword} onChange={passShowEvent}/>
                  <label>Show Password</label>
              </div>
              <Link to="/yip/school-dashboard" id="submitBtn" type="button">Login</Link>
              {errorStatus? <ErrorBox/> : <></>}
          </form>
      </div>
    </div>
  )
}

const ErrorBox = ()=>{
  return(
    <div id="login-error" className="login-error"><p>Error: Login Failed!</p></div>
  )
}

export default Login
