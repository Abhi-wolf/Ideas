/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  function setUserDetails(newuser) {
    setUserName(newuser.name);
    setUserId(newuser.id);
  }

  useEffect(() => {
    if (userName && userId) {
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
    }
  }, [userId, userName]);

  const contextValue = {
    userName,
    userId,
    setUserDetails,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
