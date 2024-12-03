import WebRTCService from "./webrtc-service.js";
import SignalingService from "./p2p-service.js";
import { rtdb } from "./firebase.js";
import { ref, onValue, set } from "firebase/database";

class ConnectionManager {
  constructor() {
    this.roomId = null;
    this.peerId = null;
    this.isInitiator = false;
  }

  async initializeConnection(roomId) {
    if (!roomId) {
      throw new Error("Room ID is required");
    }

    try {
      // Initialize room first
      await SignalingService.createRoom(roomId);
      this.roomId = roomId;

      // Initialize WebRTC after room is created
      await WebRTCService.initializeConnection();

      // Start local stream
      const localStream = await WebRTCService.startLocalStream();

      // Update room status
      await this.updateStatus("connected");

      return {
        localStream,
        peerId: this.peerId,
      };
    } catch (error) {
      console.error("Connection initialization failed:", error);
      await this.updateStatus("error");
      throw error;
    }
  }
  setupSignalHandling() {
    SignalingService.onSignal(async (data) => {
      try {
        if (data.type === "offer") {
          await WebRTCService.handleOffer(data.offer);
          const answer = await WebRTCService.createAnswer();
          await SignalingService.sendSignal(data.from, {
            type: "answer",
            answer,
          });
        } else if (data.type === "answer") {
          await WebRTCService.handleAnswer(data.answer);
        } else if (data.type === "ice-candidate") {
          await WebRTCService.handleIceCandidate(data.candidate);
        }
      } catch (error) {
        console.error("Signal handling error:", error);
      }
    });
  }

  async initiateCall() {
    try {
      const offer = await WebRTCService.createOffer();
      await SignalingService.sendSignal(this.targetPeerId, {
        type: "offer",
        offer,
      });
    } catch (error) {
      console.error("Call initiation failed:", error);
      throw error;
    }
  }

  // Monitor connection status
  monitorConnection(onStatusChange) {
    const statusRef = ref(rtdb, `rooms/${this.roomId}/status`);
    onValue(statusRef, (snapshot) => {
      const status = snapshot.val();
      onStatusChange?.(status);
    });
  }

  // Update connection status
  async updateStatus(status) {
    if (this.roomId) {
      const statusRef = ref(rtdb, `rooms/${this.roomId}/status`);
      await set(statusRef, {
        status,
        timestamp: Date.now(),
        peerId: this.peerId,
      });
    }
  }

  async disconnect() {
    try {
      await this.updateStatus("disconnecting");
      WebRTCService.closeConnection();
      await SignalingService.leaveRoom();
      this.roomId = null;
      this.peerId = null;
    } catch (error) {
      console.error("Disconnect failed:", error);
      throw error;
    }
  }
}

export default new ConnectionManager();
