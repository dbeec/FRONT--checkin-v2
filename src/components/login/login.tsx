import { IconButton, InputAdornment, TextField } from "@mui/material";
import "./login.css";
import React, { useState } from "react";
import { apiBackend } from "../../config/config";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAuth({
      ...auth,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (auth.email === "" || auth.password === "") {
        return toast.warning("Please complete all fields to log in.");
      }
      const response = await axios.post(`${apiBackend}/auth/login`, {
        email: auth.email,
        password: auth.password,
      });
      if (response.status === 201) {
        const token = response.data.access_token;
        localStorage.setItem("access_token", token);
        toast.success("YEY, you are logged in", {
          duration: 1400
        });
        setTimeout(() => navigate("/admin/wowdesarrollos"), 1500);
      }
    } catch (error) {
      toast.error("Internal error");
    }
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
              value={auth.email}
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
              name="password"
              variant="outlined"
              onChange={handleInputOnChange}
              value={auth.password}
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
