import { useState } from "react";
import companiesData from "./menu";
import "./sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  // const route = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__logo">
          <h2>
            Check<span>In</span>
          </h2>
        </div>

        <div className="sidebar__createuser">
          <li onClick={() => setOpen(!open)}>create worker</li>
        </div>

        <span className="sidebar__categories">companies</span>

        <ul className="sidebar__options">
          {companiesData.companies.map((item, index) => (
            <Link key={index} to={item.url}>
              <li>
                <div className="sidebar__icon">{item.icon}</div>
                {item.name}
              </li>
            </Link>
          ))}
        </ul>

        <span className="sidebar__categories">history table</span>

        <ul className="sidebar__historytables">
          {companiesData.histories.map((item, index) => (
            <a key={index} href={item.url}>
              <li>
                <div className="sidebar__icon">{item.icon}</div>
                {item.name}
              </li>
            </a>
          ))}
        </ul>

        <span className="sidebar__categories">externals</span>

        <ul className="sidebar__historytables">
          {companiesData.externals.map((item, index) => (
            <a key={index} href={item.url}>
              <li>
                <div className="sidebar__icon">{item.icon}</div>
                {item.name}
              </li>
            </a>
          ))}
        </ul>
      </div>
    </>
  );
}