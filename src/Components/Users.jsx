import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";

import { UserContext } from "../Context/NoteStateContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";


const Users = ({ showAlert }) => {
  const ref = useRef(null);

  const [updateUser, setupdateUser] = useState({ name: "", email: "", phone: "" });

  const context = useContext(UserContext);
  const { Users, editNote, getAllUsers } = context;

  useEffect(() => {
    getAllUsers();
  }, []);

  const updateNote = (note) => {
    ref.current.click();
    setupdateUser({ ...note });
  };

  const handleChange = (e) => {
    setupdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { name, email, phone } = updateUser;
    const updatedNote = { name, email, phone }; // Create a new object with the correct properties
    
    async function upd_ate() {
      let res = await editNote(updatedNote);
      if (res === false) {
        alert(" Trying To Update With Invalid Data")
      }
      showAlert("User updated successfully", "success");
    }
    upd_ate();
  };


  return (
    <>
      <AddNote showAlert={showAlert} />

      {/* Modal */}
      <button
        style={{ display: "none" }}
        type="button"
        ref={ref}
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Contact
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Enter a name..."
                    onChange={handleChange}
                    value={updateUser.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Enter an email..."
                    onChange={handleChange}
                    value={updateUser.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    id="phone"
                    placeholder="Enter a phone number..."
                    onChange={handleChange}
                    value={updateUser.phone}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        {Users.length > 0 ? (
          <h2 style={{ textAlign: "center" }}>Users</h2>
        ) : (
          <h2 style={{ textAlign: "center", marginTop: "20px" }}>
            Add your first Contact
          </h2>
        )}
        {Users?.map((note) => (
          <NoteItem
            key={note._id}
            note={note}
            updateNote={updateNote}
            showAlert={showAlert}
          />
        ))}
      </div>
    </>
  );
};

export default Users;
