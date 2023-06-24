import React, { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
const SignUp = ({ showAlert }) => {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = userData;

    if (name && email && password) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existingUsers.some((user) => user.email === email);
      if (!userExists) {
        const newUser = { name, email, password };
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        async function redirect() {
         await login(name);
         
         await history.push("/");
       }
        redirect();
        await showAlert("account created successfully", "success");
        setUserData({ name: "", email: "", password: "" });

      } else {
        showAlert("user already exists", "danger");
      }
    } else {
      showAlert("Please fill all the data", "danger");
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full name
          </label>
          <input
            type="text"
            className="form-control"
            value={userData.name}
            name="name"
            placeholder="Enter your name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={userData.email}
            name="email"
            placeholder="Enter your email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={userData.password}
            name="password"
            placeholder="Enter your password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
