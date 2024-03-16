import CreateNewUser from "../../../components/forms/create-users/create.users";
import TableWowDesarrollos from "../../../components/tables/table.wowdesarrollos";
import Announcement from "../../../components/utilities/announcements/template";

export default function Users() {
  return (
    <>
      {/* Sección para el formulario de creación */}
      <Announcement
        title="Users Management"
        text="Create employees for your company"
      />
      <div className="form_section">
        {/* Management form here */}
        <CreateNewUser />
      </div>

      {/* Sección de la tabla para los usuarios registrados */}
      <Announcement
        title="List of employees"
        text="Total number of employees of the company"
      />
      <div style={{ display: "grid" }}>
        {/* Tabla */}
        <TableWowDesarrollos />
      </div>
    </>
  );
}
