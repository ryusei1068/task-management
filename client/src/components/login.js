import React, { useState } from "react";
import API from "./api";
import { Form, Button } from "react-bootstrap";

function Login(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [faildMessage, setfaildMessaga] = useState("");

  const handleChange = (e) => {
    switch (e.target.id) {
      case "username":
        setUserName(e.target.value);
        setMessage("");
        break
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  }

  const formSubmit = (e, path) => {
    e.preventDefault();
    if (username.length < 8 || password.length < 8) return;

    const data = {
      username: username,
      password: password
    }

    API.post(path, data)
      .then(res => {
        const { result } = res.data;
        if (result.code === 400) {
          setMessage(result.message);
          return;
        }
        else if (result.code === 403) {
          setfaildMessaga(result.message);
          return;
        }
        props.authenticate(true);
      })
      .catch(() => {
        props.authenticate(false);
      })
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="login-container">
          <div className="container py-4">
            <Form>
              <div>
                <Form.Text>user name and password must be at least 8 characters</Form.Text>
              </div>
              <div>
                <Form.Text className="text-danger">{faildMessage}</Form.Text>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <div>
                  <Form.Text>{message}</Form.Text>
                </div>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  minLength="1"
                  maxLength="255"
                  onChange={(e) => handleChange(e)}
                  id="username"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  minLength="8"
                  maxLength="255"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                  id="password"
                />
              </Form.Group>
              <div className="d-flex">
                <Button variant="outline-secondary" id="signup" onClick={(e) => formSubmit(e, "/signup")}>
                  Sign Up
                </Button>
                <Button className="mx-2 px-3" variant="outline-secondary" id="login" onClick={(e) => formSubmit(e, "/login")}>
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
