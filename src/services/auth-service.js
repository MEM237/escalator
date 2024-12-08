import { auth } from "./firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthService = {
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      console.error("Auth error:", error);
      throw error;
    }
  },

  async createTestUser() {
    try {
      const testEmail = `test${Date.now()}@vexo.com`;
      const testPassword = "test123";
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        testEmail,
        testPassword
      );
      return userCredential.user;
    } catch (error) {
      console.error("Test user creation error:", error);
      throw error;
    }
  },

  async toggleTestUser() {
    try {
      if (auth.currentUser) {
        await signOut(auth);
        return null;
      } else {
        return await this.createTestUser();
      }
    } catch (error) {
      console.error("Toggle test user error:", error);
      throw error;
    }
  },

  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
  },

  getCurrentUser() {
    return auth.currentUser;
  },
};

export default AuthService;
