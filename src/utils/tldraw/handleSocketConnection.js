const handleSocketConnection = (ioSocket) => {
  const statusChangeListeners = new Set();
  const tldrawSocket = {
    connectionStatus: "offline",

    sendMessage: (message) => {
      console.log("📤 Sending:", message);
      ioSocket.emit("tldraw-message", JSON.stringify(message));
    },

    onReceiveMessage: (callback) => {
      // Listen for tldraw sync protocol messages
      const handler = (message) => {
        console.log("📥 Received:", message);
        callback(message);
      };

      ioSocket.on("tldraw-message", handler);

      // Return cleanup function
      return () => {
        ioSocket.off("tldraw-message", handler);
      };
    },

    onStatusChange: (callback) => {
      statusChangeListeners.add(callback);
      return () => {
        statusChangeListeners.delete(callback);
      };
    },

    restart: () => {
      console.log("🔄 Restarting Socket.IO connection...");
      ioSocket.disconnect();
      ioSocket.connect();
    },

    close: () => {
      ioSocket.off("connect", connectHandler);
      ioSocket.off("disconnect", disconnectHandler);
      ioSocket.off("connect_error", errorHandler);
      clearTimeout(initialStatusTimeout);
      ioSocket.disconnect();
    },
  };

  // Map Socket.IO events to TLPersistentClientSocket status
  const connectHandler = () => {
    tldrawSocket.connectionStatus = "online";
    statusChangeListeners.forEach((cb) => cb({ status: "online" }));
  };

  const disconnectHandler = () => {
    tldrawSocket.connectionStatus = "offline";
    statusChangeListeners.forEach((cb) => cb({ status: "offline" }));
  };

  const errorHandler = (error) => {
    tldrawSocket.connectionStatus = "error";
    statusChangeListeners.forEach((cb) =>
      cb({
        status: "error",
        reason: error.message || "Connection error",
      }),
    );
  };

  ioSocket.on("connect", connectHandler);
  ioSocket.on("disconnect", disconnectHandler);
  ioSocket.on("connect_error", errorHandler);

  // Set initial status
  const initialStatusTimeout = setTimeout(() => {
    if (ioSocket.connected) {
      tldrawSocket.connectionStatus = "online";
      statusChangeListeners.forEach((cb) => cb({ status: "online" }));
    }
  }, 0);

  return tldrawSocket;
};

export default handleSocketConnection;
