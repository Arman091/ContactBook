
import React, { useState, useContext } from "react";
import { UserContext } from "../Context/NoteStateContext";
import { Form, Button, Col } from "react-bootstrap";

const AddNote = ({ showAlert }) => {
  const context = useContext(UserContext);
  const { addNote } = context;
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, email, phone } = user;
    const errors = {};

    if (name.trim() === "") {
      errors.name = "Name is required";
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must be 10 digits";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addNote(user);
      setUser({
        name: "",
        email: "",
        phone: "",
      });
      showAlert("User added successfully", "success");
    } else {
      showAlert("Enter valid details", "danger");
    }
  };

  return (
    <div className="my-2">
      <h2>Add  Contact</h2>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="mb-3">
          <Form.Group as={Col} controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="mb-3">
          <Form.Group as={Col} controlId="formPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Button variant="primary" type="submit">
          Add Contact
        </Button>
      </Form>
    </div>
  );
};

export default AddNote;
