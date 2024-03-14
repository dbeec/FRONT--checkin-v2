import { TextField } from "@mui/material";
import "./login.css";
export default function Login() {
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
              variant="outlined"
              size="small"
            />
          </div>

          <div className="main__contentinputs">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              size="small"
            />
          </div>

          <div className="main__button">
            <a href="/admin/wowdesarrollos">Enter</a>
          </div>
        </form>
      </div>
    </>
  );
}
