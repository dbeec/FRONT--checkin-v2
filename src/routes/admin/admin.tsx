import "./admin.css";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <>
      <div className="content">
        <Sidebar />
        <div className="content__header">
          <Header />
          <div className="content__information">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
