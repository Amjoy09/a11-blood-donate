import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [roleLoading, setRoleLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const registerWithEmailPassword = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const handleGoogleSignin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
      setRoleLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/users/role/${user.email}`).then((res) => {
      setRole(res.data.role);
      setUserStatus(res.data.status);
      setRoleLoading(false);
    });
  }, [user]);

  const authData = {
    registerWithEmailPassword,
    user,
    setUser,
    handleGoogleSignin,
    userStatus,
    role,
    roleLoading,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
