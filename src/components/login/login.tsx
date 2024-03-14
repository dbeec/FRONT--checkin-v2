import { TextField } from "@mui/material";
import "./login.css";
import React, { useState } from "react";
import { apiBackend } from "../../config/config";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    document: "",
    empPass: "",
  });

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // let value = e.target.value.replace(/\D/g, "");
    setAuth({
      ...auth,
      [name]: value,
    });
  };

  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Error:" }), 2000)
    );

  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(auth.document, auth.empPass);
    if (auth.document === "" || auth.empPass === "") {
      return toast.warning("Please complete all fields to log in.");
    }
    axios
      .post(`${apiBackend}/auth/login`, {
        document: auth.document,
        empPass: auth.empPass,
      })
      .then((response) => {
        if (response.status === 201) {
          const token = response.data.AccessToken;
          localStorage.setItem("access_token", token);
          toast.success("YEY, you are logged in");
          setTimeout(() => navigate("/admin/wowdesarrollos"), 1300);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        toast.error("Error de conexión en el servidor");
        toast.promise(promise, {
          loading: 'Loading...',
          success: (data: any) => {
            return `${data.name} Internal server`;
          },
          error: 'Error'
        })
      });
  };
  return (
    <>
      <Toaster
        richColors
        expand
        visibleToasts={1}
        position="top-right"
        duration={1000}
      />
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
              // value={auth.document}
              size="small"
              sx={{
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#2074d4",
                  },
              }}
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
              sx={{
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#2074d4",
                  },
              }}
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
