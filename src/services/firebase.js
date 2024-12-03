import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDOXTKJgLlNfq7Sn-f_CYEFDn92S74Cw9w",
  authDomain: "vexo-8df2d.firebaseapp.com",
  databaseURL: "https://vexo-8df2d-default-rtdb.firebaseio.com",
  projectId: "vexo-8df2d",
  storageBucket: "vexo-8df2d.firebasestorage.app",
  messagingSenderId: "54849424101",
  appId: "1:54849424101:web:604c71656e7ce3dbdd220c",
  measurementId: "G-T0FVZNZCB4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);

export { analytics };
export default app;
