import useTheme from "../../hooks/useTheme";
import { useWorkspace } from "../../hooks/useWorkspace";
import { useAuth } from "../../hooks/useAuth";
import socketIO from "socket.io-client";
import { useSync } from "@tldraw/sync";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import handleSocketConnection from "../../utils/tldraw/handleSocketConnection";
import { useCallback, useEffect, useState } from "react";

export default function MainWhiteBoard() {
  const { darkMode } = useTheme();
  const { ID } = useWorkspace();
  const { user } = useAuth();
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (editor !== null && editor !== undefined) {
      editor.user.updateUserPreferences({
        colorScheme: darkMode ? "dark" : "light",
      });
    } else return;
  }, [darkMode, editor]);

  const store = useSync({
    connect: useCallback(() => {
      const io = socketIO(`${import.meta.env.VITE_BOARD_ENDPOINT}`, {
        query: {
          workspaceID: ID,
          email: user.email,
        },
      });
      return handleSocketConnection(io);
    }, [ID, user.email]),
  });

  return (
    <div className="w-full fixed md:w-[65%] xl:w-[75%] md:static h-[calc(100%-41.6px)] md:h-full">
      <Tldraw
        store={store.store}
        className={`border ${darkMode ? "border-[#30363b]" : "border-[#d3d3d3]"}`}
        onMount={(editor) => setEditor(editor)}
      />
    </div>
  );
}
