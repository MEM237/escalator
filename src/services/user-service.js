import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

class UserService {
  // ... previous methods ...

  async searchUsers(searchTerm) {
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("displayName", ">=", searchTerm),
        where("displayName", "<=", searchTerm + "\uf8ff")
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  }

  async sendConnectionRequest(fromUserId, toUserId) {
    try {
      const userRef = doc(db, "users", toUserId);
      await updateDoc(userRef, {
        pendingConnections: arrayUnion({
          userId: fromUserId,
          timestamp: serverTimestamp(),
          status: "pending",
        }),
      });
      return true;
    } catch (error) {
      console.error("Connection request error:", error);
      throw error;
    }
  }

  async acceptConnection(userId, requesterId) {
    try {
      // Add to both users' connections
      const userRef = doc(db, "users", userId);
      const requesterRef = doc(db, "users", requesterId);

      await updateDoc(userRef, {
        connections: arrayUnion(requesterId),
        pendingConnections: arrayRemove({
          userId: requesterId,
          status: "pending",
        }),
      });

      await updateDoc(requesterRef, {
        connections: arrayUnion(userId),
      });

      return true;
    } catch (error) {
      console.error("Accept connection error:", error);
      throw error;
    }
  }

  async getConnections(userId) {
    try {
      const userDoc = await this.getProfile(userId);
      const connections = userDoc.connections || [];

      const connectionProfiles = await Promise.all(
        connections.map((id) => this.getProfile(id))
      );

      return connectionProfiles;
    } catch (error) {
      console.error("Get connections error:", error);
      throw error;
    }
  }
}

export default new UserService();
