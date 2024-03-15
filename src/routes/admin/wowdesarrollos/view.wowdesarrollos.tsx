// import CollapsibleTable from "../../../components/tables/table.wowdesarrollos";
import TableWowDesarrollos from "../../../components/tables/table.wowdesarrollos";
import Announcement from "../../../components/utilities/announcements/template";

export default function WowDesarrollos() {
  return (
    <>
      <div className="announceview">
        <Announcement
          title="Total employees of WOW Desarrollos"
          text="Find all registered employees and their recorded attendance"
        />

        {/* Tabla */}
        <TableWowDesarrollos />
      </div>
    </>
  );
}
