import VerificationInput from "react-verification-input";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { verifyUser, userRegister, verifyForgotPassword } from "../../api/auth";
import { showToastMessage } from "../toasts/showToast";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import Button from "../../components/ui/button";
import { getThemeStyles } from "../../styles/theme";

export default function OtpComp({
  setOtpDiv,
  requestBody,
  setLoader,
  forgotPassword = false,
}) {
  const [count, setCount] = useState(59);
  const [otp, setOtp] = useState("");
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);
  const [verifyLoader, setVerifyLoader] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const timeOutCallback = useCallback(() => setCount((curr) => curr - 1), []);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(timeOutCallback, 1000);
      return () => clearTimeout(timer);
    }
  }, [count, timeOutCallback]);

  const handleVerify = async () => {
    setVerifyLoader(true);
    const body = { otp };

    if (forgotPassword) {
      const data = await verifyForgotPassword(body);
      showToastMessage(data.message, data.info);

      if (!data.valid) {
        setLoader(false);
        setOtpDiv(false);
        return;
      }

      setLoader(false);
      return navigate("/auth");
    }

    const data = await verifyUser(body);
    showToastMessage(data.message, data.info);

    if (!data.valid) {
      setLoader(false);
      setOtpDiv(false);
      return;
    }

    setLoader(false);
    login(data);
    navigate("/dashboard");
  };

  const handleReset = async () => {
    setLoader(true);
    const data = await userRegister(requestBody);
    showToastMessage(data.message, data.info);
    setCount(59);
  };

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center ${theme.overlay}`}
    >
      <div
        className={`w-[95%] md:w-[70%] lg:w-[420px] p-8 rounded-2xl transition-colors duration-500 ${theme.card}`}
      >
        <h1 className="text-2xl font-semibold text-center">
          Verification Code
        </h1>

        <p className={`text-sm text-center mt-2 ${theme.mutedText}`}>
          Enter the 6-digit code sent to your email
        </p>

        <div className="mt-6 flex justify-center">
          <VerificationInput
            validChars="0-9"
            value={otp}
            onChange={setOtp}
            classNames={{
              container: "gap-2",
              character: `w-10 h-12 rounded-lg border text-center text-lg focus:border-purple-500 focus:outline-none ${
                darkMode
                  ? "bg-white/10 border-white/10 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`,
              characterInactive: "opacity-70",
              characterSelected: "border-purple-500",
            }}
          />
        </div>

        <div className="mt-4 flex justify-between items-center text-xs">
          <span className={theme.mutedText}>
            00:{count < 10 ? `0${count}` : count}
          </span>

          <button
            onClick={handleReset}
            disabled={count !== 0}
            className="text-purple-500 hover:text-purple-600 disabled:text-gray-400 transition"
          >
            Resend Code
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            variant="primary"
            onClick={handleVerify}
            disabled={verifyLoader}
          >
            Verify
          </Button>

          <Button
            variant="ghost"
            onClick={() => window.location.reload()}
            disabled={verifyLoader}
          >
            Cancel
          </Button>
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
