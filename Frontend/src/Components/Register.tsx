import { Input, Button } from "antd"
import {Link} from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"

interface Register{
  name: string,
  email: string,
  password: string,
}

const Register = () => {

  const [registerUser, setRegisterUser] = useState<Register>({
    name: "",
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleRegister = async (): Promise<void>=>{
    try {
      await axios.post("http://localhost:8080/api/v3/users/register", registerUser);
      toast.success("Registration Successfull")
      navigate('/')
    } catch (error) {
      toast.error("Registration failed!")
      console.log(error)
    }

  }

  return (
    <div id="register-bg">
      <Toaster />
      <div className="register-container">
        <form className="formR-container">
          <h3 style={{ textAlign: 'center' }}>Register</h3>
          <Input type="text" placeholder="Name" value={registerUser.name} onChange={(e) => { setRegisterUser({ ...registerUser, name:e.target.value }) }}/>
          <Input type="email" placeholder="Email" value={registerUser.email} onChange={(e) => { setRegisterUser({ ...registerUser, email:e.target.value }) }}/>
          <Input type="password" placeholder="password" value={registerUser.password} onChange={(e) => { setRegisterUser({ ...registerUser, password:e.target.value }) }}/>
          <Button className="submit-btn2" type="primary" onClick={handleRegister} ghost={false}>Register</Button>
        </form>
        <div className="register-bottom">
          <p>Already have an account?</p>
          <Link to="/">
          <p>Login</p>
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default Register
