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
          sx={{ width: 100 }}
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
          }}
        />

        <TextField
          id="outlined-basic"
          label="Full Name"
          name="name"
          variant="outlined"
          size="small"
          sx={{
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#302c2c",
            },
            minWidth: 600,
          }}
        />

        <div className="button">
          <button>Create</button>
        </div>
      </form>
    </>
  );
}
