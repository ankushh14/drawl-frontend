import { useState } from "react";
import InputComp from "../../utils/input/InputComp";
import InputIcons from "../../utils/input/InputIcons";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc"

export default function Register() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullnameDesc, setFullnameDesc] = useState("")
    const [emailDesc, setEmailDesc] = useState("")
    const [passwordDesc, setPasswordDesc] = useState("")
    const [loader, setLoader] = useState(false);
    // const login = useGoogleLogin({
    //     onSuccess: tokenResponse => console.log(tokenResponse),
    // });

    return (
        <div className="regitser-div w-[90%] md:w-[70%] lg:w-[45%] rounded-md shadow shadow-[#6d6d6d60] p-5">
            <div className="heading-div w-full text-center py-4 mb-3">
                <h1 className="text-3xl">
                    NexusMeetHub
                </h1>
            </div>
            <form className="form-div">
                <div className={"fullname w-full"}>
                    <InputComp type={"text"} label={"Full name"} placeholder={"John Doe"} name={"fullname"} required={false} stateVar={fullname} setStatevar={setFullname} description={fullnameDesc} descriptionControlFunc={setFullnameDesc} />
                </div>
                <div className={"email w-full"}>
                    <InputComp type={"text"} label={"Email"} placeholder={"someone@gmail.com"} name={"email"} required={false} stateVar={email} setStatevar={setEmail} description={emailDesc} descriptionControlFunc={setEmailDesc} />
                </div>
                <div className={"password w-full relative"}>
                    <InputComp type={"password"} label={"Password"} placeholder={"John_doe123"} name={"password"} required={false} stateVar={password} setStatevar={setPassword} description={passwordDesc} descriptionControlFunc={setPasswordDesc} />
                    <InputIcons type={"password"} />
                </div>
                <div className={"submit-btn w-full px-1 my-3"}>
                    <button type={"submit"} className={`font-kalam text-white bg-black font-normal py-2 text-center rounded transition duration-500 ease-in-out focus:outline-none focus:shadow-outline hover:text-slate-200 w-full flex justify-center space-x-1 items-center  disabled:bg-slate-700`} disabled={loader}>{<span>Submit</span>}</button>
                </div>
            </form>
            <div className="w-full text-center p-1">
                <h1 className="text-xs text-slate-500">Or</h1>
            </div>
            <div className="google-login-div w-full p-1 flex justify-center items-center my-2">
                <button type="button" className="border-green-300 border-2 p-2 w-full flex justify-center items-center space-x-2" ><FcGoogle size={21}/><span>Sign up with Google</span></button>
            </div>
        </div>
    )
}
