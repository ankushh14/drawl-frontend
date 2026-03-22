import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

export default function Chat({ chat }) {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  const isMe = user.email === chat.email;

  return (
    <div
      className={`w-full flex gap-2 my-2 ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {!isMe && (
        <img
          src={chat.profile}
          alt="profile"
          className="w-7 h-7 rounded-full self-end"
        />
      )}

      <div className={`flex flex-col max-w-[75%]`}>
        <div
          className={`flex items-center gap-2 text-[0.6rem] mb-1 opacity-70
          ${isMe ? "justify-end" : "justify-start"}`}
        >
          <span className="truncate max-w-[120px]">
            {isMe ? "You" : chat.email}
          </span>
          <span>{chat.time}</span>
        </div>
        <div
          className={`px-4 py-2 text-xs leading-relaxed rounded-2xl break-words whitespace-pre-wrap w-fit
          ${
            isMe
              ? darkMode
                ? "bg-purple-600 text-white rounded-br-sm"
                : "bg-purple-500 text-white rounded-br-sm"
              : darkMode
                ? "bg-white/10 text-white rounded-bl-sm"
                : "bg-gray-100 text-gray-900 rounded-bl-sm"
          }`}
        >
          {chat.message}
        </div>
      </div>
      {isMe && (
        <img
          src={chat.profile}
          alt="profile"
          className="w-7 h-7 rounded-full self-end"
        />
      )}
    </div>
  );
}

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
};
