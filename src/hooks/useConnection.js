import { useState, useEffect } from "react";
import ConnectionManager from "../services/connection-manager";

export function useConnection(roomId) {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("initializing");
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function initializeConnection() {
      try {
        setConnectionStatus("connecting");

        // Generate a unique room ID if none provided
        const activeRoomId =
          roomId ||
          `vexo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const { localStream } = await ConnectionManager.initializeConnection(
          activeRoomId
        );

        if (mounted) {
          setLocalStream(localStream);
          setConnectionStatus("connected");
        }
      } catch (err) {
        console.error("Connection initialization failed:", err);
        if (mounted) {
          setError(err);
          setConnectionStatus("error");
        }
      }
    }

    if (roomId) {
      initializeConnection();
    }

    return () => {
      mounted = false;
      ConnectionManager.disconnect();
    };
  }, [roomId]);

  return {
    localStream,
    remoteStream,
    connectionStatus,
    error,
  };
}
