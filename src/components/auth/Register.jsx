import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { getToken } from "../../api/getToken";
import {
  isValidEmail,
  isValidFullname,
  isValidPassword,
} from "../../utils/validation/auth.validation";
import { oauthRegister, userRegister } from "../../api/auth";
import { showToastMessage } from "../../utils/toasts/showToast";
import PropTypes from "prop-types";
import OtpComp from "../../utils/otp/OtpComp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/button";
import Input from "../ui/input";
import useTheme from "../../hooks/useTheme";
import { getThemeStyles } from "../../styles/theme";

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
  const navigate = useNavigate();
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

  const authlogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoader(true);
        const userData = await getToken(tokenResponse.access_token);
        setProfile(userData.returnData.profile);
        let requestBody = {
          fullname: userData.returnData.fullname,
          email: userData.returnData.email,
        };
        const data = await oauthRegister(requestBody);
        showToastMessage(data.message, data.info);
        if (data.valid === false) {
          return setLoader(false);
        }
        setLoader(false);
        login(data);
        return navigate("/dashboard");
      } catch (error) {
        return showToastMessage("Some Error Occured", "error");
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
    <div className={`w-full rounded-2xl p-6 md:p-8 transition ${theme.card}`}>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold font-Aclonica bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
          DrawL
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Create your account to get started
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Full name"
          placeholder="John Doe"
          name="fullname"
          stateVar={fullname}
          setStatevar={setFullname}
          description={fullnameDesc}
          descriptionControlFunc={setFullnameDesc}
        />

        <Input
          type="text"
          label="Email"
          placeholder="someone@gmail.com"
          name="email"
          stateVar={email}
          setStatevar={setEmail}
          description={emailDesc}
          descriptionControlFunc={setEmailDesc}
        />

        <Input
          type="password"
          label="Password"
          placeholder="John_doe123"
          name="password"
          stateVar={password}
          setStatevar={setPassword}
          description={passwordDesc}
          descriptionControlFunc={setPasswordDesc}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loader}
        >
          Create Account
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-gray-500">OR</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <button
        type="button"
        onClick={() => authlogin()}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition
        ${theme.card}
          hover:scale-[1.01] active:scale-95`}
      >
        <FcGoogle size={20} />
        <span className="text-sm">Continue with Google</span>
      </button>

      <div className="mt-6 text-center text-xs text-gray-500">
        Already have an account?{" "}
        <span
          className="text-purple-400 cursor-pointer hover:underline"
          onClick={() => setNewUser(false)}
        >
          Login
        </span>
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
  setNewUser: PropTypes.func,
};
