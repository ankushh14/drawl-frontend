import VerificationInput from "react-verification-input";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { verifyUser, userRegister, verifyForgotPassword } from "../../api/auth";
import { showToastMessage } from "../toasts/showToast";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

export default function OtpComp({ setOtpDiv, requestBody, setLoader,forgotPassword = false }) {
  const [count, setCount] = useState(59);
  const [otp, setOtp] = useState("");
  const { darkMode } = useTheme()
  const [verifyLoader, setVerifyLoader] = useState(false);
  const { login } = useAuth();
  const timeOutCallback = useCallback(
    () => setCount((curr) => curr - 1),
    [setCount]
  );
  const navigate = useNavigate();

  useEffect(() => {
    count > 0 && setTimeout(timeOutCallback, 1000);
  }, [count, timeOutCallback]);

  const handleVerify = async () => {
    let body = {
      otp,
    };
    setVerifyLoader(true);
    if(forgotPassword){
      const data = await verifyForgotPassword(body)
      showToastMessage(data.message, data.info);
      if (data.valid === false) {
        setLoader(false);
        return setOtpDiv(false);
      }
      setLoader(false)
      return navigate("/auth");
    }
    const data = await verifyUser(body);
    showToastMessage(data.message, data.info);
    if (data.valid === false) {
      setLoader(false);
      return setOtpDiv(false);
    }
    setLoader(false);
    login(data);
    return navigate("/dashboard");
  };

  const resetTimer = () => {
    setCount(59);
  };
  const handleReset = async () => {
    setLoader(true);
    const data = await userRegister(requestBody);
    showToastMessage(data.message, data.info);
    return resetTimer();
  };
  return (
    <div className="Otp-div-background absolute top-0 left-0 right-0 bottom-0 bg-[#5c5b5b5d] flex justify-center items-center">
      <div className={`otp-div w-[95%] md:w-[75%] lg:w-[45%] p-5 rounded-md 
      ${
        darkMode
          ? "bg-[#212529] text-white  shadow-white"
          : "bg-white text-black shadow-slate-500"
      }`}>
        <div className="verify-code w-full my-4 flex justify-center items-center">
          <h1 className="text-3xl">Verification Code</h1>
        </div>
        <div className="verify-code w-full my-4 flex justify-center items-center">
          <h1 className="text-xs">Please check your entered gmail for OTP</h1>
        </div>
        <div className="Otp-main w-full my-4 flex py-2 justify-center items-center">
          <VerificationInput
            validChars="0-9"
            placeholder=" "
            value={otp}
            onChange={(value) => setOtp(value)}
          />
        </div>
        <div className="verify-code w-full my-4 flex justify-center items-center">
          <button
            className="text-xs text-red-400 hover:text-red-500 disabled:text-red-300 border-none"
            disabled={count === 0 ? false : true}
            onClick={handleReset}
          >
            Resend Code
          </button>
        </div>
        <div className="verify-code w-full my-4 flex flex-col space-y-3 justify-center items-center">
          <button
            type={"button"}
            onClick={handleVerify}
            className={`font-kalam text-white bg-black font-normal py-2 text-center rounded transition duration-500 ease-in-out focus:outline-none focus:shadow-outline hover:text-slate-200 w-[80%] flex justify-center space-x-1 items-center active:scale-95 disabled:bg-slate-700`}
            disabled={verifyLoader}
          >
            <span>Verify</span>
          </button>
          <button
            type={"button"}
            onClick={()=>window.location.reload()}
            className={`font-kalam text-white bg-black font-normal py-2 text-center rounded transition duration-500 ease-in-out focus:outline-none focus:shadow-outline hover:text-slate-200 w-[80%] flex justify-center space-x-1 items-center active:scale-95 disabled:bg-slate-700`}
            disabled={verifyLoader}
          >
            <span>Cancel</span>
          </button>
        </div>
        <div className="verify-code w-full my-4 mt-8 flex justify-center items-center">
          <h1 className="text-xs text-blue-500">
            0:{count < 10 && "0"}
            {count}
          </h1>
        </div>
      </div>
    </div>
  );
}

OtpComp.propTypes = {
  setOtpDiv: PropTypes.func,
  requestBody: PropTypes.object,
  setLoader: PropTypes.func,
  forgotPassword: PropTypes.bool,
};
