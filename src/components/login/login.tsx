import { IconButton, InputAdornment, TextField } from "@mui/material";
import "./login.css";
import React, { useState } from "react";
import { apiBackend } from "../../config/config";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import delayPromise from "../utilities/sooner/messages";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
        if (error.request) {
          const promise = () =>
            new Promise((_, reject) =>
              setTimeout(() => reject({ name: "Sonner" }), 2000)
            );
          toast.promise(promise, {
            loading: "Loading...",
            success: (data: any) => {
              return `${data.name} toast has been added`;
            },
            error: "Error",
          });
        }
        toast.error(error.response.data.message);
      })
      .finally(() => {
        // toast.error("Error de conexión en el servidor");
        toast.promise(delayPromise(), {
          loading: "espere por favor.",
          // success: "todo bien",
          error: "todo mal",
        });
      });
  };

  // Función para ocultar la contraseña
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  // <--->

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
              label="Email"
              type="email"
              name="email"
              variant="outlined"
              autoFocus
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
              type={showPassword ? 'text' : 'password'}
              name="empPass"
              variant="outlined"
              onChange={handleInputOnChange}
              size="small"
              sx={{
                "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2074d4",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
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
