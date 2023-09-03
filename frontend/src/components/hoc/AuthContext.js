import React, { createContext, useEffect, useState } from "react";
import { useMeReadQuery } from "@src/store/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { isLoading, isSuccess, data: userData } = useMeReadQuery();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      isSuccess ? setIsAuthenticated(true) : setIsAuthenticated(false);
    }
  }, [isLoading]);

  if (isLoading) return <p>Loading</p>;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
