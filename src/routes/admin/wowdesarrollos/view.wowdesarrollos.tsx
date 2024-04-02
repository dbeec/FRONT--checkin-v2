import TableWowDesarrollos from "../../../components/tables/table.wowdesarrollos";
import Announcement from "../../../components/utilities/announcements/template";

export default function WowDesarrollos() {
  return (
    <>
      <Announcement
        title="Total employees of WOW Desarrollos"
        text="Find all registered employees and their recorded attendance"
      />
      <div style={{ display: 'grid' }}>
        {/* Tabla */}
        <TableWowDesarrollos />
      </div>
    </>
  );
}
