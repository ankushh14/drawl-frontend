import {useState} from 'react'
import Register from '../components/auth/Register'
import Login from '../components/auth/Login'

export default function AuthPage() {
  const [newUser,setNewUser] = useState(false)  
  return (
    <div className="main-div w-full h-screen flex justify-center items-center">
      {
        newUser?<Register setNewUser={setNewUser}/>:<Login/>
      }
    </div>
  )
}

