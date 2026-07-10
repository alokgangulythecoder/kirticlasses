import React, { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

// ============================================================
// PRODUCTION ADMIN LOGIN — powered by Firebase Authentication.
// There is no sign-up screen in this app on purpose: the only way
// to become an admin is for YOU to create the account yourself in
// Firebase Console > Authentication > Users > Add user. Anyone who
// successfully signs in here is, by construction, someone you
// personally created a login for — so firestore.rules can safely
// treat "request.auth != null" as "this is an admin".
// See README.md > "Securing Admin Login" for setup steps.
// ============================================================

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      return { success: true };
    } catch (error) {
      return { success: false, error: friendlyAuthError(error) };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, initializing, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function friendlyAuthError(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "That doesn't look like a valid email address.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a bit and try again.";
    case "auth/network-request-failed":
      return "Network error — check your connection and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export function useAuth() {
  return useContext(AuthContext);
}
