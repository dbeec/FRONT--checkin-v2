import {
  MenuItem,
  TextField,
} from "@mui/material";
import "./create.users.css";
import { useEffect, useState } from "react";
import { apiBackend } from "../../../config/config";
import axios from "axios";

interface TypesState {
  type: string;
}
export default function CreateNewUser() {
  const [documentTypes, setDocumentTypes] = useState<TypesState[]>([])
  const [createUser, setCreateUser] = useState({
    documentType: "",
    document: "",
    email: "",
    full_name: "",
  })

  // Funcion para cambiar el valor de los inputs
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    const { name, value } = ev.target;
    setCreateUser((prevCreateUser) => ({
      ...prevCreateUser,
      [name]: value,
    }));
  };

  // Funcion para crear un usuario
  const handleSubmitCreateNewUser = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      await axios.post(`${apiBackend}/user`, createUser);
      console.log("Usuario creado correctamente");
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const responseTypes = await axios.get(`${apiBackend}/document-types`)
        setDocumentTypes(responseTypes.data)
        console.log("pruebaaa❤️❤️❤️", responseTypes.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDocumentTypes()
  }, [])
  return (
    <>
      <form className="form" onSubmit={handleSubmitCreateNewUser}>
        <TextField
          id="outlined-select-currency"
          select
          label="Document type"
          name="type"
          size="small"
          sx={{ maxWidth: 105, minWidth: 100 }}
          onChange={handleChange}
          value={createUser.documentType}
        >
          {documentTypes.map((option) => (
            <MenuItem key={option.type} value={option.type}>
              {option.type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-basic"
          label="Document"
          name="document"
          variant="outlined"
          size="small"
          onChange={handleChange}
          value={createUser.document}
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
          onChange={handleChange}
          value={createUser.email}
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
          name="full_name"
          variant="outlined"
          size="small"
          onChange={handleChange}
          value={createUser.full_name}
          sx={{
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#302c2c",
            },
          }}
        />

        <div className="button">
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  );
}
