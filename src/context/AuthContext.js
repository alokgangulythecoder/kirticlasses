import React, { createContext, useContext, useState } from "react";

// ============================================================
// DEMO ADMIN CREDENTIALS — CHANGE BEFORE GOING LIVE!
// username: admin   password: admin
// This is a simple client-side check meant for a quick launch.
// For real production security, replace this with Firebase
// Authentication (email/password) so credentials aren't
// hardcoded inside the app bundle. See README "Securing Admin
// Login" section for step-by-step instructions.
// ============================================================
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
