// original code

import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";

const initState = {
  Users: [],
  UsersItem: { name: "", email: "", phone: " " },
};
const reducerfunc = (state, action) => {
  // if (action.type === "ADD") {
  //   const {email} = action.item;
  //   const userExists = state.Users.some(
  //     (user) =>
  //       user.email === email 
  //   );

  //   if (!userExists) {
  //     return {
  //       ...state,
  //     };
  //   } else {
  //     return {
  //       Users: [...state.Users, action.item],
  //     };
  //   }
  // }
  if (action.type === "ADD") {
    const { email } = action.item;
    const userExists = state.Users.some((user) => user.email === email);

    if (userExists) {
      // User with the same email already exists, return current state
      return state;
    } else {
      // User with the same email doesn't exist, add the new user to the state
      return {
        ...state,
        Users: [...state.Users, action.item],
      };
    }
  }


  // Removing a User
  if (action.type === "REMOVE") {
    const { name, email, phone } = action.user;
    const updatedList = state.Users.filter((user) => {
      return user.name !== name || user.email !== email || user.phone !== phone;
    });
    return {
      ...state,
      Users: updatedList,
    };
  }

  if (action.type === "UPDATE") {
    const { id, name, email, phone } = action.user;
    const updatedUsers = state.Users.map((user) => {
      if (user._id === id) {
        return {
          ...user,
          name: name,
          email: email,
          phone: phone,
        };
      }
      return user;
    });

    return {
      ...state,
      Users: updatedUsers,
    };
  }

  return initState;
};

export const UserContext = createContext();

const UserstateContext = ({ children }) => {
  const [Users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [newstateSnap, dispatch] = useReducer(reducerfunc, initState);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setUsers(initState.Users);
  };

  // ! Add a note
  const addNote = async (user) => {
    dispatch({ type: "ADD", item: user });
  };

  // ! Delete a note
  const deleteNote = async (user) => {
    dispatch({ type: "REMOVE", user: user });
  };

  // ! Edit a note
  const editNote = async (user) => {
    dispatch({ type: "UPDATE", user: user });
  };
  let Context = {
    Users: newstateSnap.Users,
    setUsers,
    addNote,
    deleteNote,
    editNote,
    getAllUsers,
    username,
    setUsername,
  };

  return (
    <UserContext.Provider value={Context}>{children}</UserContext.Provider>
  );
};

export default UserstateContext;
