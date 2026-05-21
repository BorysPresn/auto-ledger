import { NavLink } from "react-router-dom";
import { sidebarNavLinks } from "../model/config";

export const Sidebar = () => {
  return (
    <aside>
      <nav>
        <ul>
          {sidebarNavLinks.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path}>{item.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
