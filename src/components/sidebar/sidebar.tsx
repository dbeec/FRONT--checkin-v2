import companiesData from "./menu";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar({
  open_drawer,
  set_open,
}: {
  open_drawer: boolean;
  set_open: () => void;
}) {

  return (
    <>
      <div className={`sidebar ${open_drawer ? "sidebar__open" : ""}`}>
        <div className="sidebar__logo">
          <h2>
            Check<span>In</span>
          </h2>
        </div>

        <span className="sidebar__categories">gestión</span>

        <ul className="sidebar__options">
          {companiesData.gestion.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) => (isActive ? "active" : "")}
              to={item.url}
            >
              <li>
                <div className="sidebar__icon">{item.icon}</div>
                <div className="text">{item.name}</div>
              </li>
            </NavLink>
          ))}
        </ul>

        <span className="sidebar__categories">companies</span>

        <ul className="sidebar__options">
          {companiesData.companies.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) => (isActive ? "active" : "")}
              to={item.url}
            >
              <li>
                <div className="sidebar__icon">{item.icon}</div>
                <div className="text">{item.name}</div>
              </li>
            </NavLink>
          ))}
        </ul>

        <span className="sidebar__categories">history table</span>

        <ul className="sidebar__options">
          {companiesData.histories.map((item, index) => (
            <a key={index} href={item.url}>
              <li>
                <div className="sidebar__icon">{item.icon}</div>
                <div className="text">{item.name}</div>
              </li>
            </a>
          ))}
        </ul>

        <span className="sidebar__categories">externals</span>

        <ul className="sidebar__options">
          {companiesData.externals.map((item, index) => (
            <a key={index} href={item.url}>
              <li>
                <div className="sidebar__icon">{item.icon}</div>
                <div className="text">{item.name}</div>
              </li>
            </a>
          ))}
        </ul>
      </div>
      <div
        className={`sidebar__bg-active ${
          !open_drawer ? "sidebar__bg-disable" : ""
        }`}
        onClick={set_open}
      />
    </>
  );
}
