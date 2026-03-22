import { FcGoogle } from "react-icons/fc";
import Input from "../ui/input";
import { useState } from "react";
import { showToastMessage } from "../../utils/toasts/showToast";
import PropTypes from "prop-types";
import { useGoogleLogin } from "@react-oauth/google";
import { userLogin } from "../../api/auth";
import {
  isValidEmail,
  isValidPassword,
} from "../../utils/validation/auth.validation";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../ui/button";
import useTheme from "../../hooks/useTheme";
import { getThemeStyles } from "../../styles/theme";

export default function Login({ setNewUser }) {
  const [email, setEmail] = useState("");
  const [emailDesc, setEmailDesc] = useState("");
  const [password, setPassword] = useState("");
  const [passwordDesc, setPasswordDesc] = useState("");
  const [loader, setLoader] = useState(false);
  const { login, updateForgotPasswordStatus } = useAuth();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoader(true);
        let requestBody = {
          googleAuthToken: tokenResponse.access_token,
        };
        const data = await userLogin(requestBody);
        showToastMessage(data.message, data.info);
        setLoader(false);
        if (data.info === "success") {
          login(data);
          return navigate("/dashboard");
        }
      } catch (error) {
        return setLoader(false);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let requestBody = {
      email: "",
      password: "",
    };

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
    const data = await userLogin(requestBody);
    showToastMessage(data.message, data.info);
    setLoader(false);

    if (data.info === "success") {
      login(data);
      return navigate("/dashboard");
    }
  };

  const handleForgotPassword = () => {
    updateForgotPasswordStatus(true);
    return navigate("/auth/forgotPassword");
  };

  return (
    <div className={`w-full rounded-2xl p-6 md:p-8 transition ${theme.card}`}>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold font-Aclonica bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className={`text-xs mt-2 ${theme.mutedText}`}>
          Login to continue to DrawL
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-xs text-purple-500 hover:text-purple-600 transition"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loader}
        >
          Login
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className={`flex-1 h-px ${theme.divider}`} />
        <span className="text-xs text-gray-500">OR</span>
        <div className={`flex-1 h-px ${theme.divider}`} />
      </div>

      <button
        type="button"
        onClick={() => googleLogin()}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition active:scale-95
        ${theme.card}`}
      >
        <FcGoogle size={20} />
        <span className="text-sm">Continue with Google</span>
      </button>

      <div className="mt-6 text-center text-xs text-gray-500">
        New to DrawL?{" "}
        <span
          className="text-purple-500 cursor-pointer hover:underline"
          onClick={() => setNewUser(true)}
        >
          Signup
        </span>
      </div>
    </div>
  );
}

Login.propTypes = {
  setNewUser: PropTypes.func,
};
