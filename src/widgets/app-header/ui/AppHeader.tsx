import { NavLink } from "react-router-dom";
import { headerNavLinks } from "../model/config";

export const AppHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          {headerNavLinks.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path}>{item.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
