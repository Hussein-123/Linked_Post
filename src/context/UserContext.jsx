import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (token) {
      const { user } = jwtDecode(token);
      setUserId(user);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ token, setToken, userId }}>
      {children}
    </UserContext.Provider>
  );
}
