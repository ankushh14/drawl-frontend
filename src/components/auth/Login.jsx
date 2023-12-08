import { FcGoogle } from "react-icons/fc";
import InputComp from "../../utils/input/InputComp";
import InputIcons from "../../utils/input/InputIcons";
import { useState } from "react";
import { showToastMessage } from "../../utils/toasts/showToast";
import Proptypes from "prop-types"
import { useGoogleLogin } from '@react-oauth/google';
import { userLogin } from "../../api/auth";
import { isValidEmail, isValidPassword } from "../../utils/validation/auth.validation";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";



export default function Login({setNewUser}) {
  const [email, setEmail] = useState("");
  const [emailDesc, setEmailDesc] = useState("")
  const [password, setPassword] = useState("");
  const [passwordDesc, setPasswordDesc] = useState("")
  const [loader, setLoader] = useState(false);
  const { login } = useAuth()
  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        try {
          let requestBody = {
            googleAuthToken : tokenResponse.access_token
          }
          const data = await userLogin(requestBody)
          showToastMessage(data.message,data.info)
          setLoader(false)
          login(data)
          return navigate("/home")
        } catch (error) {
            console.log(error.message)
            return setLoader(false)
        }
    },
});
  const handleSubmit = async(e)=>{
    e.preventDefault();
    let requestBody = {
        email: "",
        password: ""
    }
    const emailValidity = isValidEmail(email);
        if (emailValidity.valid) {
            requestBody.email = email
        } else {
            return setEmailDesc(emailValidity.message)
        }
        const passwordValidity = isValidPassword(password);
        if (passwordValidity.valid) {
            requestBody.password = password
        } else {
            return setPasswordDesc(passwordValidity.message)
        }
        setLoader(true)
        const data = await userLogin(requestBody);
        showToastMessage(data.message, data.info);
        setLoader(false)
        if(data.info === "success"){
            login(data)
            return navigate("/home")
        }else{
            return
        }
  }
  return (
    <div className="regitser-div w-[90%] md:w-[70%] lg:w-[45%] rounded-md shadow shadow-[#6d6d6d60] p-5">
    <div className="heading-div w-full text-center py-4 mb-3">
        <h1 className="text-3xl">
            Welcome Back To NexusMeetHub.
        </h1>
    </div>
    <form className="form-div" onSubmit={handleSubmit}>
        <div className={"email w-full"}>
            <InputComp type={"text"} label={"Email"} placeholder={"someone@gmail.com"} name={"email"} required={false} stateVar={email} setStatevar={setEmail} description={emailDesc} descriptionControlFunc={setEmailDesc} />
        </div>
        <div className={"password w-full relative"}>
            <InputComp type={"password"} label={"Password"} placeholder={"John_doe123"} name={"password"} required={false} stateVar={password} setStatevar={setPassword} description={passwordDesc} descriptionControlFunc={setPasswordDesc} />
            <InputIcons type={"password"} />
        </div>
        <div className={"submit-btn w-full px-1 my-3"}>
            <button type={"submit"} className={`font-kalam text-white bg-black font-normal py-2 text-center rounded transition duration-500 ease-in-out focus:outline-none focus:shadow-outline hover:text-slate-200 w-full flex justify-center space-x-1 items-center active:scale-95  disabled:bg-slate-700`} disabled={loader}><span>Login</span></button>
        </div>
    </form>
    <div className="w-full text-center p-1">
        <h1 className="text-xs text-slate-500">Or</h1>
    </div>
    <div className="google-login-div w-full p-1 flex justify-center items-center my-2">
        <button type="button" onClick={() => googleLogin()} className="border-green-300 border-2 p-2 w-full flex justify-center items-center space-x-2 active:scale-95 transition-all duration-500" ><FcGoogle size={21} /><span>Login with Google</span></button>
    </div>
    <div className="already w-full my-4 flex justify-center items-center">
        <h1 className="text-xs">New to nexusMeetHub? <span className="font-bold cursor-pointer" onClick={()=>setNewUser(true)}>Signup</span></h1>
    </div>
</div>
  )
}

Login.propTypes = {
  setNewUser : Proptypes.func
}
