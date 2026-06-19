import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

import {
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  getUserProfile,
} from "../firebase/auth";

// import { useCart } from "./CartContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const { resetCart } = useCart();

  /**
   * Build app user object from Firebase Auth + Firestore
   */
  const buildUserObject = useCallback(async (firebaseUser) => {
    if (!firebaseUser) return null;

    try {
      const profile = await getUserProfile(firebaseUser.uid);

      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,

        displayName:
          firebaseUser.displayName ||
          profile?.displayName ||
          "",

        role: profile?.role || "customer",
        phone: profile?.phone || "",
        address: profile?.address || "",
        city: profile?.city || "",

        photoURL: firebaseUser.photoURL || profile?.photoURL || "",

        emailVerified: firebaseUser.emailVerified,
      };
    } catch (error) {
      console.error("Failed to load user profile:", error);

      // Safe fallback (NO profile reference here)
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || "",
        role: "customer",
        phone: "",
        address: "",
        city: "",
        photoURL: firebaseUser.photoURL || "",
        emailVerified: firebaseUser.emailVerified,
      };
    }
  }, []);

  /**
   * Listen to Firebase auth state
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      try {
        if (!firebaseUser) {
          setUser(null);
          return;
        }

        const appUser = await buildUserObject(firebaseUser);
        setUser(appUser);
      } catch (error) {
        console.error("Auth state error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [buildUserObject]);


  /**
   * LOGIN
   */
  const login = async (email, password) => {
    await loginUser(email, password);
    // user auto-updates via onAuthStateChanged
  };

  /**
   * REGISTER
   */
  const register = async ({ displayName, email, password }) => {
    await registerUser({
      displayName,
      email,
      password,
    });
    // auto login happens via auth listener
  };

  /**
   * LOGOUT
   */
  const logout = async () => {
    localStorage.removeItem("guestCart");
    await logoutUser();
    setUser(null);
    // resetCart();
  };

  /**
   * RESET PASSWORD
   */
  const resetPasswordHandler = async (email) => {
    return await resetPassword(email);
  };

  const value = useMemo(
    () => ({
      user,
      loading,

      login,
      register,
      logout,
      resetPassword: resetPasswordHandler,

      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {/* Prevent UI flicker until auth is ready */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);


