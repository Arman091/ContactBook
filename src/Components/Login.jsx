import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/NoteStateContext";
import { useContext } from "react";

const Login = ({ showAlert }) => {
  
  const history = useHistory();
  const { setUsername } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const user = existingUsers.find(
        (user) => user.email === email && user.password === password
      );

     
    
      if (user) {
          let firstName = "";
        
        setUsername(firstName);
        showAlert("login success", "success");
        history.push("/");
      } else {
        showAlert("invalid credentials", "danger");
      }
    } else {
      showAlert("Please fill all the data", "danger");
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            name="email"
            placeholder="Enter your email"
            id="email"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            placeholder="Enter your password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          LogIn
        </button>
      </form>
    </div>
  );
};

export default Login;
