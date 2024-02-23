import { useState } from "react";
import InputComp from "../../utils/input/InputComp";
import InputIcons from "../../utils/input/InputIcons";
import {
  isValidEmail,
  isValidPassword,
} from "../../utils/validation/auth.validation";
import OtpComp from "../../utils/otp/OtpComp";
import { forgotPassword } from "../../api/auth";
import { showToastMessage } from "../../utils/toasts/showToast";

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
        "Password & Confirm Password do not match."
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
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[90%] md:w-[70%] lg:w-[45%] rounded-md shadow shadow-[#6d6d6d60] p-5">
        <div className="w-full py-2">
          <h1 className="text-3xl w-full text-center">Reset Password</h1>
        </div>
        <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
          <div className={"w-full"}>
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
          <div className={"w-full relative"}>
            <InputComp
              type={"password"}
              label={"New Password"}
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
          <div className={"w-full relative"}>
            <InputComp
              type={"password"}
              label={"Confirm Password"}
              placeholder={"Re-enter_above_password"}
              name={"confirmpassword"}
              required={false}
              stateVar={confirmPassword}
              setStatevar={setconfirmPassword}
              description={confirmPasswordDesc}
              descriptionControlFunc={setconfirmPasswordDesc}
            />
          </div>
          <div className={"w-full px-1 my-3"}>
            <button
              type={"submit"}
              className={`font-kalam text-white bg-black font-normal py-2 text-center rounded transition duration-500 ease-in-out focus:outline-none focus:shadow-outline hover:text-slate-200 w-full flex justify-center space-x-1 items-center active:scale-95  disabled:bg-slate-700`}
              disabled={loader}
            >
              <span>Reset Password</span>
            </button>
          </div>
        </form>
      </div>
      {otpDiv && (
        <OtpComp
          setOtpDiv={setOtpDiv}
          requestBody={requestToSend}
          setLoader={setLoader}
          forgotPassword = {true}
        />
      )}
    </div>
  );
}
