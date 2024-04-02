import HistoryTable from "../../../components/tables/table.history";
import Announcement from "../../../components/utilities/announcements/template";

export default function History() {
  return (
    <>
      <p>En esta vista habra una tabla donde apareces todos los trabajadores de la empresa que se encuentren registrados, todavia no tengo estructurada la tabla, pero debe tener un par de iconos con los que pueda interactuar para tener mas informacion detallada del usuario.
        debe haber un icono que se llame "Ver registros" ese boton lo que abrira sera un modal o una vista con otra tabla y que esta contenga todos los registros que el usuario ha tenido a lo largo de su estancia en la empresa.
      </p>

      <Announcement
        title="Total employees registered"
        text="Find all registered users and review their history"
      />
      <div style={{ display: 'grid' }}>
        {/* Tabla */}
        <HistoryTable />
      </div>
    </>
  );
}