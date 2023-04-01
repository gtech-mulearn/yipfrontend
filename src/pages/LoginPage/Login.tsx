import React,{useState} from 'react'
import YIPlogo from '../../assets/logo.png'
import './Login.css'

function Login() {
  const [errorStatus,setErrorStatus] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [password, setPassword] = useState<string>("")

  const passHandleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value)
  }

  const passShowEvent = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setShowPassword(event.target.checked)
  }
  return (
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
            <button id="submitBtn" type="button">Login</button>
            {errorStatus? <ErrorBox/> : <></>}
        </form>
    </div>
  )
}

const ErrorBox = ()=>{
  return(
    <div id="login-error" className="login-error"><p>Error: Login Failed!</p></div>
  )
}

export default Login
