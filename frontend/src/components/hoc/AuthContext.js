import React, { createContext, useEffect, useState } from "react";
import { useMeReadQuery } from "@src/store/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { isFetching, isSuccess, data: userData } = useMeReadQuery();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    isSuccess && setIsAuthenticated(true);
  }, [isFetching]);

  if (isFetching) return <p>Loading</p>;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
