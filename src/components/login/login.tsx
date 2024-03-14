import { TextField } from "@mui/material";
import "./login.css";
import React, { useState } from "react";
import { apiBackend } from "../../config/config";
import axios from "axios";

export default function Login() {
  const [auth, setAuth] = useState({
    document: "",
    empPass: "",
  });

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth({
      ...auth,
      [name]: value,
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios
      .post(`${apiBackend}/auth/login`, {
        document: auth.document,
        empPass: auth.empPass,
      })
      .then((response) => {
        if (response.status === 201) {
          const token = response.data.AccessToken;
          localStorage.setItem("access_token", token);
          alert("success");
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <>
      <div className="main">
        <form className="main__form">
          <div className="main__titleform">
            <h1>CheckIn</h1>
            <p>Welcome to Checkin again</p>
          </div>

          <div className="main__contentinputs">
            <TextField
              id="outlined-basic"
              label="Document"
              name="document"
              variant="outlined"
              onChange={handleInputOnChange}
              size="small"
            />
          </div>

          <div className="main__contentinputs">
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              name="empPass"
              variant="outlined"
              onChange={handleInputOnChange}
              size="small"
            />
          </div>

          <div className="main__button">
            <button onClick={handleLogin}>Enter</button>
          </div>
        </form>
      </div>
    </>
  );
}
