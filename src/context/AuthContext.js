import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    setCurrentUser(null);
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false)
    });
    
    return () => {
      unsub();
    };
  }, []);
  if(loading){
    return(
      <h1>
        loading authentication
      </h1>
    )
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};