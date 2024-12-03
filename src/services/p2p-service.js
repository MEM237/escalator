import { rtdb } from "./firebase";
import { ref, set, onValue, remove } from "firebase/database";

class SignalingService {
  constructor() {
    this.roomId = null;
    this.peerId = null;
  }

  async createRoom(roomId) {
    this.roomId = roomId;
    this.peerId = `peer_${Math.random().toString(36).substr(2, 9)}`;

    const roomRef = ref(rtdb, `rooms/${roomId}`);

    await set(roomRef, {
      created: Date.now(),
      peers: {},
    });

    return this.peerId;
  }

  onSignal(callback) {
    if (!this.roomId || !this.peerId) throw new Error("Room not initialized");

    const signalRef = ref(rtdb, `rooms/${this.roomId}/signals/${this.peerId}`);
    onValue(signalRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        callback(data);
        remove(signalRef);
      }
    });
  }

  async sendSignal(targetPeerId, signal) {
    if (!this.roomId) throw new Error("Room not initialized");

    const signalRef = ref(rtdb, `rooms/${this.roomId}/signals/${targetPeerId}`);
    await set(signalRef, {
      from: this.peerId,
      signal,
      timestamp: Date.now(),
    });
  }

  async leaveRoom() {
    if (this.roomId && this.peerId) {
      const peerRef = ref(rtdb, `rooms/${this.roomId}/peers/${this.peerId}`);
      await remove(peerRef);
      this.roomId = null;
      this.peerId = null;
    }
  }
}

export default new SignalingService();
