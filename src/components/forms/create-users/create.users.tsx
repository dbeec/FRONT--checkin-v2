import { TextField } from "@mui/material";
import "./create.users.css";
export default function CreateNewUser() {
  return (
    <>
      <form className="form">
        <h3>Users register</h3>
        <div className="content-inputs">
          <TextField
            id="outlined-basic"
            label="Document"
            name="document"
            variant="outlined"
            size="small"
            sx={{
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#302c2c",
                },
            }}
          />

          <TextField
            id="outlined-basic"
            label="Document"
            name="document"
            variant="outlined"
            size="small"
            sx={{
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#302c2c",
                },
            }}
          />

          <TextField
            id="outlined-basic"
            label="Document"
            name="document"
            variant="outlined"
            size="small"
            sx={{
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#302c2c",
                },
            }}
          />

          <TextField
            id="outlined-basic"
            label="Document"
            name="document"
            variant="outlined"
            size="small"
            sx={{
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#302c2c",
                },
            }}
          />
        </div>

        <div className="button">
          <button>Save</button>
        </div>
      </form>
    </>
  );
}
