import PropTypes from "prop-types";
import { useState } from "react";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import useTheme from "../../../hooks/useTheme";
import { getThemeStyles } from "../../../styles/theme";

export default function Input({
  disable,
  type,
  description,
  label,
  placeholder,
  name,
  required = false,
  stateVar,
  setStatevar,
  descriptionControlFunc,
  onKeyDown,
}) {
  const [visible, setVisible] = useState(false);
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);

  const isPassword = type === "password";
  const inputType = isPassword ? (visible ? "text" : "password") : type;
  const hasError = description !== "";

  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-xs font-medium text-gray-500 dark:text-gray-400"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div
        className={`relative w-full rounded-xl border transition-all duration-200
        ${theme.input}
        ${theme.hoverBorder}
       focus-within:border-purple-500
        ${
          hasError
            ? "border-red-500"
            : "border-white/10 focus-within:border-purple-500"
        }
        ${disable ? "opacity-50 cursor-not-allowed" : ""}
      `}
      >
        <input
          type={inputType}
          id={name}
          name={name}
          placeholder={placeholder}
          value={stateVar}
          onChange={(e) => setStatevar(e.target.value)}
          onFocus={() => descriptionControlFunc("")}
          onKeyDown={onKeyDown}
          autoComplete="off"
          disabled={disable}
          required={false}
          className="w-full bg-transparent text-sm text-inherit px-4 py-3 pr-10 rounded-xl outline-none placeholder:text-gray-400"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            {visible ? <BsEyeFill size={16} /> : <BsEyeSlashFill size={16} />}
          </button>
        )}
      </div>
      {hasError && (
        <span className="text-xs text-red-500 mt-1">{description}</span>
      )}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  description: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  disable: PropTypes.bool,
  stateVar: PropTypes.string,
  setStatevar: PropTypes.func,
  descriptionControlFunc: PropTypes.func,
  onKeyDown: PropTypes.func,
};
