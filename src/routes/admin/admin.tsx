import "./admin.css";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function Admin() {
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const handleToggle = () => {
    setToggleDrawer(!toggleDrawer)
  }

  return (
    <>
      <div className="content">
        <Sidebar open_drawer={toggleDrawer} set_open={handleToggle}/>
        <div className="content__header">
          <Header set_open={handleToggle}/>
          <div className="content__information">
            {/* Aqui va el contenido principal, NO BORRAR EL COMPONENTE OUTLET*/}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}