import { useState } from "react";
import Input from "../../components/ui/input";
import {
  isValidEmail,
  isValidPassword,
} from "../../utils/validation/auth.validation";
import OtpComp from "../../utils/otp/OtpComp";
import { forgotPassword } from "../../api/auth";
import { showToastMessage } from "../../utils/toasts/showToast";
import Button from "../../components/ui/button";
import useTheme from "../../hooks/useTheme";
import { getThemeStyles } from "../../styles/theme";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailDesc, setEmailDesc] = useState("");
  const [password, setPassword] = useState("");
  const [passwordDesc, setPasswordDesc] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [confirmPasswordDesc, setconfirmPasswordDesc] = useState("");
  const [loader, setLoader] = useState(false);
  const [otpDiv, setOtpDiv] = useState(false);
  const [requestToSend, setRequestToSend] = useState({});
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

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

    if (password !== confirmPassword) {
      return setconfirmPasswordDesc(
        "Password & Confirm Password do not match.",
      );
    }

    setLoader(true);
    const data = await forgotPassword(requestBody);
    showToastMessage(data.message, data.info);

    if (data.info === "success") {
      setRequestToSend(requestBody);
      setLoader(false);
      return setOtpDiv(true);
    } else return setLoader(false);
  };

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center ${theme.page}`}
    >
      <div
        className={`w-full max-w-md rounded-2xl p-6 md:p-8 transition ${theme.card}`}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold font-Aclonica bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className={`text-xs mt-2 ${theme.mutedText}`}>
            Enter your email and set a new password
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
            label="New Password"
            placeholder="John_doe123"
            name="password"
            stateVar={password}
            setStatevar={setPassword}
            description={passwordDesc}
            descriptionControlFunc={setPasswordDesc}
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Re-enter password"
            name="confirmpassword"
            stateVar={confirmPassword}
            setStatevar={setconfirmPassword}
            description={confirmPasswordDesc}
            descriptionControlFunc={setconfirmPasswordDesc}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loader}
          >
            Reset Password
          </Button>
        </form>
      </div>

      {otpDiv && (
        <OtpComp
          setOtpDiv={setOtpDiv}
          requestBody={requestToSend}
          setLoader={setLoader}
          forgotPassword={true}
        />
      )}
    </div>
  );
}
