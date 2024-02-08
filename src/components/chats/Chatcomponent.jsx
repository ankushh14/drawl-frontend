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
let io;

export default function Chatcomponent({ setOnline, chatComponent }) {
  const inputRef = useRef(null);
  const { name } = useWorkspace();
  const { darkMode } = useTheme();
  const [message, setMessage] = useState("");
  const [chatDisable, setChatDisable] = useState(false);
  const [chats, setChats] = useState([]);
  const { user, token } = useAuth();
  const { ID } = useWorkspace();

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
          message: message,
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
      return setChats(data.data);
    } else {
      return;
    }
  }, [ID, token]);

  const updateMessages = useCallback(() => {
    io.on("message", (newMessage) => {
      setChats((prev) => [...prev, newMessage]);
    });
  }, [setChats]);

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

  return (
    <div
      className={`absolute md:opacity-100 md:w-[35%] xl:w-[25%] md:static h-[calc(100%-41.6px)] md:h-full border-t flex md:flex flex-col overflow-hidden transition-[width,opacity] md:transition-none duration-500 ease-in-out 
    ${
      darkMode
        ? "bg-[#212529] text-white border-[#30363b]"
        : "bg-white text-black border-[#d3d3d3] "
    } 
    ${chatComponent ? "w-full opacity-100" : "w-0 opacity-0"}
    `}
    >
      <div className="chat-header w-full p-2 rounded-b-sm border-b border-inherit flex justify-between items-center relative">
        <h1 className="font-bold">{name}</h1>
      </div>
      <div className="body-chat h-full w-full border-inherit p-2 flex flex-col overflow-y-scroll">
        {chats.length > 0 &&
          chats.map((item, index) => {
            return <Chat chat={item} key={index} />;
          })}
      </div>
      <div className="w-full justify-self-end py-2 border-t border-inherit">
        <div className="input-div w-full relative p-2">
          <div
            className="send-btn cursor-pointer absolute right-4 bottom-5"
            onClick={simulateEnter}
          >
            <FaCircleChevronRight
              size={20}
              className="text-slate-500 bg-inherit"
            />
          </div>
          <textarea
            rows="1"
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleSendMessage}
            disabled={chatDisable}
            placeholder="Type your message here ..."
            className="w-full p-2 rounded-md text-slate-500 text-xs pr-8 resize-none outline-slate-500 border-slate-400 border-2"
          />
        </div>
      </div>
    </div>
  );
}

Chatcomponent.propTypes = {
  setOnline: PropTypes.func.isRequired,
  chatComponent: PropTypes.bool.isRequired,
};
