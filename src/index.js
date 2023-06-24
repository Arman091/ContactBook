import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import NoteStateContext from "./Context/NoteStateContext";
import { AuthProvider } from "./Context/AuthContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NoteStateContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NoteStateContext>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
