import React, { createContext, useReducer } from "react";

// Initial state for authentication
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Reducer function for authentication
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login function
  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  // Logout function
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // Provide the state and login/logout functions to the children components
  const contextValue = {
    isAuthenticated:state.isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
