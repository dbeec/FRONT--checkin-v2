import CreateNewUser from "../../../components/forms/create-users/create.users";
import TableWowDesarrollos from "../../../components/tables/table.wowdesarrollos";
import Announcement from "../../../components/utilities/announcements/template";

export default function Users() {
  return (
    <>
      <div className="form_section">
        <Announcement
          title="Users Management"
          text="Create employees for your company"
        />

        {/* Management form here */}
        <CreateNewUser />

        <div>
          <Announcement
            title="Users Management"
            text="Create employees for your company"
          />

          {/* Tabla */}
          <TableWowDesarrollos />
        </div>
      </div>
    </>
  );
}
