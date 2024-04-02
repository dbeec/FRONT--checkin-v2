import {
  MenuItem,
  TextField,
} from "@mui/material";
import "./create.users.css";
import documentType from "./data";

export default function CreateNewUser() {
  return (
    <>
      <form className="form">
        <TextField
          id="outlined-select-currency"
          select
          label="Document type"
          size="small"
          sx={{ maxWidth: 105, minWidth: 100 }}
        >
          {documentType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-basic"
          label="Document"
          name="document"
          variant="outlined"
          size="small"
          sx={{
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#302c2c",
            },
            maxWidth: 200,
          }}
        />

        <TextField
          id="outlined-basic"
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          size="small"
          sx={{
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#302c2c",
            },
            maxWidth: 300,
          }}
        />

        <TextField className="with"
          id="outlined-basic"
          label="Full name"
          name="name"
          variant="outlined"
          size="small"
          sx={{
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#302c2c",
            },
          }}
        />

        <div className="button">
          <button>Create</button>
        </div>
      </form>
    </>
  );
}
