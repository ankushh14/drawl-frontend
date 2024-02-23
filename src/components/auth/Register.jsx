import { useState } from "react";
import InputComp from "../../utils/input/InputComp";
import InputIcons from "../../utils/input/InputIcons";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { getToken } from "../../api/getToken";
import {
  isValidEmail,
  isValidFullname,
  isValidPassword,
} from "../../utils/validation/auth.validation";
import { userRegister } from "../../api/auth";
import { showToastMessage } from "../../utils/toasts/showToast";
import Proptypes from "prop-types";
import OtpComp from "../../utils/otp/OtpComp";

export default function Register({ setNewUser }) {
  const [fullname, setFullname] = useState("");
  const [profile, setProfile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullnameDesc, setFullnameDesc] = useState("");
  const [emailDesc, setEmailDesc] = useState("");
  const [passwordDesc, setPasswordDesc] = useState("");
  const [loader, setLoader] = useState(false);
  const [otpDiv, setOtpDiv] = useState(false);
  const [requestToSend, setRequestToSend] = useState({});
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userData = await getToken(tokenResponse.access_token);
        setFullname(userData.returnData.fullname);
        setEmail(userData.returnData.email);
        setProfile(userData.returnData.profile);
        return setPasswordDesc("Please enter a valid password");
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let requestBody = {
      fullname: "",
      email: "",
      password: "",
      profile,
    };
    const fullnameValidity = isValidFullname(fullname);
    if (fullnameValidity.valid) {
      requestBody.fullname = fullname;
    } else {
      return setFullnameDesc(fullnameValidity.message);
    }
    const emailValidity = isValidEmail(email);
    if (emailValidity.valid) {
      requestBody.email = email;
    } else {
      return setEmailDesc(emailValidity.message);
    }
    const passwordValidity = isValidPassword(password);
    if (passwordValidity.valid) {
      requestBody.password = password;
    } else {
      return setPasswordDesc(passwordValidity.message);
    }
    setLoader(true);
    const data = await userRegister(requestBody);
    showToastMessage(data.message, data.info);
    if (data.info === "success") {
      setRequestToSend(requestBody);
      setLoader(false);
      return setOtpDiv(true);
    } else return setLoader(false);
  };

  return (
    <div className="regitser-div w-[90%] md:w-[70%] lg:w-[45%] rounded-md shadow shadow-[#6d6d6d60] p-5">
      <div className="heading-div w-full text-center py-4 mb-3">
        <h1 className="text-3xl">NexusMeetHub</h1>
      </div>
      <form className="form-div" onSubmit={handleSubmit}>
        <div className={"fullname w-full"}>
          <InputComp
            type={"text"}
            label={"Full name"}
            placeholder={"John Doe"}
            name={"fullname"}
            required={false}
            stateVar={fullname}
            setStatevar={setFullname}
            description={fullnameDesc}
            descriptionControlFunc={setFullnameDesc}
          />
        </div>
        <div className={"email w-full"}>
          <InputComp
            type={"text"}
            label={"Email"}
            placeholder={"someone@gmail.com"}
            name={"email"}
            required={false}
            stateVar={email}
            setStatevar={setEmail}
            description={emailDesc}
            descriptionControlFunc={setEmailDesc}
          />
        </div>
        <div className={"password w-full relative"}>
          <InputComp
            type={"password"}
            label={"Password"}
            placeholder={"John_doe123"}
            name={"password"}
            required={false}
            stateVar={password}
            setStatevar={setPassword}
            description={passwordDesc}
            descriptionControlFunc={setPasswordDesc}
          />
          <InputIcons type={"password"} />
        </div>
        <div className={"submit-btn w-full px-1 my-3"}>
          <button
            type={"submit"}
            className={`font-kalam text-white bg-black font-normal py-2 text-center rounded transition duration-500 ease-in-out focus:outline-none focus:shadow-outline hover:text-slate-200 w-full flex justify-center space-x-1 items-center active:scale-95  disabled:bg-slate-700`}
            disabled={loader}
          >
            <span>Submit</span>
          </button>
        </div>
      </form>
      <div className="w-full text-center p-1">
        <h1 className="text-xs text-slate-500">Or</h1>
      </div>
      <div className="google-login-div w-full p-1 flex justify-center items-center my-2">
        <button
          type="button"
          onClick={() => login()}
          className="border-green-300 border-2 p-2 w-full flex justify-center items-center space-x-2 active:scale-95 transition-all duration-500"
        >
          <FcGoogle size={21} />
          <span>Sign up with Google</span>
        </button>
      </div>
      <div className="already w-full my-4 flex justify-center items-center">
        <h1 className="text-xs">
          Already have an account?{" "}
          <span
            className="font-bold cursor-pointer"
            onClick={() => setNewUser(false)}
          >
            Login
          </span>
        </h1>
      </div>
      {otpDiv && (
        <OtpComp
          setOtpDiv={setOtpDiv}
          requestBody={requestToSend}
          setLoader={setLoader}
        />
      )}
    </div>
  );
}

Register.propTypes = {
  setNewUser: Proptypes.func,
};
