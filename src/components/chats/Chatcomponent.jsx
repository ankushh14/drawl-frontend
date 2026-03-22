import { FaCircleChevronRight } from "react-icons/fa6";
import { useWorkspace } from "../../hooks/useWorkspace";
import useTheme from "../../hooks/useTheme";
import Chat from "./Chat";
import { useCallback, useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";
import { useAuth } from "../../hooks/useAuth";
import getTime from "../../utils/getTime";
import { getChats } from "../../api/chats";
import { showToastMessage } from "../../utils/toasts/showToast";
import PropTypes from "prop-types";
import {
  getDecryptedText,
  getEncryptedText,
} from "../../utils/encryption/encryptText";
import { getThemeStyles } from "../../styles/theme";
let io;

export default function Chatcomponent({ setOnline, chatComponent }) {
  const inputRef = useRef(null);
  const { name } = useWorkspace();
  const { darkMode } = useTheme();
  const theme = getThemeStyles(darkMode);
  const [message, setMessage] = useState("");
  const [chatDisable, setChatDisable] = useState(false);
  const [chats, setChats] = useState([]);
  const { user, token } = useAuth();
  const { ID } = useWorkspace();
  const chatBodyRef = useRef(null);

  useEffect(() => {
    io = socketIO(`${import.meta.env.VITE_CHAT_ENDPOINT}`, {
      query: {
        workspaceID: ID,
        email: user.email,
      },
    });
    getMessages();

    return () => {
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendMessage = (e) => {
    if (e.code === "Enter" && !e.shiftKey && message.length > 0) {
      try {
        e.preventDefault();
        setChatDisable(true);
        const time = getTime();
        io.emit("sendMessage", {
          message: getEncryptedText(message, ID),
          email: user.email,
          profile: user.profile,
          id: ID,
          time,
        });
      } catch (error) {
        showToastMessage("Some Error Occured", "error");
      } finally {
        setChatDisable(false);
        setMessage("");
      }
    }
  };

  const simulateEnter = () => {
    const enterKeyPressEvent = new KeyboardEvent("keydown", {
      code: "Enter",
      shiftKey: false,
    });
    return handleSendMessage(enterKeyPressEvent);
  };

  const getMessages = useCallback(async () => {
    let requestBody = {
      ID,
    };
    const data = await getChats(requestBody, token);
    if (data.valid) {
      const chats = data.data.map((item) => {
        return { ...item, message: getDecryptedText(item.message, ID) };
      });
      return setChats(chats);
    } else {
      return;
    }
  }, [ID, token]);

  const updateMessages = useCallback(() => {
    io.on("message", (newMessage) => {
      newMessage.message = getDecryptedText(newMessage.message, ID);
      setChats((prev) => [...prev, newMessage]);
    });
  }, [setChats, ID]);

  const updateOnline = useCallback(() => {
    io.on("getOnline", (data) => {
      setOnline(data);
    });
  }, [setOnline]);

  useEffect(() => {
    updateOnline();
  }, [updateOnline]);

  useEffect(() => {
    updateMessages();
  }, [updateMessages]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div
      className={`fixed md:static top-[60px] bottom-0 flex flex-col overflow-hidden transition-[width,opacity] duration-500
    ${chatComponent ? "w-full opacity-100" : "w-0 opacity-0 md:w-[35%] xl:w-[25%] md:opacity-100"}
    ${theme.card}`}
    >
      {" "}
      <div className="px-4 py-3 border-b flex items-center justify-between sticky top-0 z-10 backdrop-blur-md bg-inherit">
        <h1 className="font-semibold text-sm truncate">{name}</h1>
      </div>
      <div
        ref={chatBodyRef}
        className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-1"
      >
        {chats.length > 0 &&
          chats.map((item, index) => <Chat chat={item} key={index} />)}
      </div>
      <div className="border-t p-3 sticky bottom-0 bg-inherit backdrop-blur-md">
        <div className="relative flex items-end">
          <textarea
            rows="1"
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleSendMessage}
            disabled={chatDisable}
            placeholder="Message..."
            className={`w-full px-4 py-3 pr-12 rounded-full resize-none outline-none text-xs transition
          ${
            darkMode
              ? "bg-white/5 border border-white/10 text-white placeholder:text-gray-400"
              : "bg-gray-100 border border-gray-300 text-gray-900 placeholder:text-gray-500"
          }
          focus:border-purple-500`}
          />

          <button
            onClick={simulateEnter}
            className={`absolute right-2 bottom-[0.3rem] p-2 rounded-full transition
          ${
            darkMode
              ? "bg-purple-600 hover:bg-purple-500 text-white"
              : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
          >
            <FaCircleChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

Chatcomponent.propTypes = {
  setOnline: PropTypes.func.isRequired,
  chatComponent: PropTypes.bool.isRequired,
};
