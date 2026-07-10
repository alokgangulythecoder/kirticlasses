// ============================================================
// FIREBASE CONFIG — REPLACE THESE VALUES WITH YOUR OWN PROJECT
// Get this from: Firebase Console > Project Settings > Your apps > Web app
// ============================================================
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaZMN8SNV_gKc9iFe8VK7WoaQ0MwEi2lI",
  authDomain: "kirticlasses-dba36.firebaseapp.com",
  projectId: "kirticlasses-dba36",
  storageBucket: "kirticlasses-dba36.firebasestorage.app",
  messagingSenderId: "41290909637",
  appId: "1:41290909637:web:68b50c88b92e531ac36dac",
  measurementId: "G-N7EC6VW5L0"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// initializeAuth (with AsyncStorage persistence) can only be called once per
// app instance — if this module ever gets re-evaluated (e.g. fast refresh),
// fall back to getAuth() so the app doesn't crash.
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}
export { auth };

export default app;
