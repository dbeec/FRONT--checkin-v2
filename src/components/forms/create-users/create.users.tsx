import { toast } from "sonner";
import { MenuItem, TextField } from "@mui/material";
import "./create.users.css";
import { useEffect, useState } from "react";
import { apiBackend } from "../../../config/config";
import axios from "axios";

interface TypesState {
  type: string;
}
export default function CreateNewUser() {
  const [documentTypes, setDocumentTypes] = useState<TypesState[]>([]);
  const [createUser, setCreateUser] = useState({
    type: "",
    document: "",
    full_name: "",
    email: "",
    password: "",
    role: "",
  });

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
  const handleSubmitCreateNewUser = async (
    ev: React.FormEvent<HTMLFormElement>
  ) => {
    ev.preventDefault();
    try {
      await axios.post(`${apiBackend}/user`, createUser);
      toast.success("Usuario creado correctamente", {
        duration: 1000,
      });
      setCreateUser({
        type: "",
        document: "",
        full_name: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      toast.error("Error al crear usuario", {
        duration: 1000,
      });
    }
  };

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const responseTypes = await axios.get(`${apiBackend}/document-types`);
        setDocumentTypes(responseTypes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDocumentTypes();
  }, []);
  return (
    <>
      <form className="form" onSubmit={handleSubmitCreateNewUser}>
        <TextField
          className="with"
          id="doctype"
          select
          label="Document type"
          name="type"
          required={true}
          size="small"
          onChange={handleChange}
          value={createUser.type}
          sx={{ backgroundColor: "#302c2c07" }}
        >
          {documentTypes.map((option) => (
            <MenuItem key={option.type} value={option.type}>
              {option.type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          className="with"
          id="doc"
          label="Document"
          name="document"
          autoComplete="off"
          variant="outlined"
          required={true}
          size="small"
          onChange={handleChange}
          value={createUser.document}
          sx={{
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#302c2c",
            },
            // maxWidth: 200,
            backgroundColor: "#302c2c07"
          }}
        />

        <TextField
          className="with"
          id="mail"
          label="Email"
          type="email"
          name="email"
          autoComplete="off"
          variant="outlined"
          required={true}
          size="small"
          onChange={handleChange}
          value={createUser.email}
          sx={{
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#302c2c",
            },
            // maxWidth: 300,
            backgroundColor: "#302c2c07"
          }}
        />

        <TextField
          className="with"
          id="name"
          label="Full name"
          name="full_name"
          autoComplete="off"
          variant="outlined"
          required={true}
          size="small"
          onChange={handleChange}
          value={createUser.full_name}
          sx={{
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#302c2c",
            },
            backgroundColor: "#302c2c07"
          }}
        />

        <TextField
          className="with"
          id="rol"
          label="Role"
          name="role"
          autoComplete="off"
          variant="outlined"
          required={true}
          size="small"
          onChange={handleChange}
          value={createUser.role}
          sx={{
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#302c2c",
            },
            // maxWidth: 150,
            backgroundColor: "#302c2c07"
          }}
        />

        <TextField
          className="with"
          id="pass"
          type="password"
          label="Password"
          name="password"
          autoComplete="off"
          variant="outlined"
          required={true}
          size="small"
          onChange={handleChange}
          value={createUser.password}
          sx={{
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#302c2c",
            },
            backgroundColor: "#302c2c07"
          }}
        />

        <div className="button">
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  );
}
