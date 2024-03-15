import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import "./create.users.css";
import React from "react";

export default function CreateNewUser() {
  const [documentType, setDocumentType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setDocumentType(event.target.value);
  };
  return (
    <>
      <form className="form">
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Document type</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={documentType}
            label="Document Type"
            onChange={handleChange}
          >
            <MenuItem value={10}>CC</MenuItem>
            <MenuItem value={20}>TI</MenuItem>
            <MenuItem value={30}>CE</MenuItem>
          </Select>
        </FormControl>

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
          label="Name"
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
