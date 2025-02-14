import { Input, Button } from "antd"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import {Link} from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface Login{
  email: string,
  password: string,
}

const Login = () => {

const [LoginUser, setLoginUser] = useState<Login>({
    email: "",
    password: "",
  })

const navigate = useNavigate()

const handleLogin = async (): Promise<void> =>{
  try {
    await axios.post("http://localhost:8080/api/v3/users/login", LoginUser)
    toast.success("Login successfull");
    navigate('/home')
  } catch (error) {
    toast.error("Login failed!")
    console.log(error)
  }
}


  return (
    <div id="login-bg">
      <div className="login-container">
        <form className="formL-container">
          <h3 style={{ textAlign: 'center' }}>Login</h3>
          <Input type="email" placeholder="Email" value={LoginUser.email} onChange={(e) => setLoginUser({ ...LoginUser, email:e.target.value })}/>
          <Input type="password" placeholder="password" value={LoginUser.password} onChange={(e) => setLoginUser({ ...LoginUser, password:e.target.value })}/>
          <Button onClick={handleLogin} type="primary" ghost={false} className="submit-btn2">Login</Button>
        </form>
        <div className="login-bottom">
          <p>Dont have an account?</p>
          <Link to="/register">
          <p>Register</p>
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Login
