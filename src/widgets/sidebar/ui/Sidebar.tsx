import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import clsx from "clsx";
import { appRouteMeta } from "../../../shared/config/routes";

export const Sidebar = () => {
  const sidebarItems = appRouteMeta.filter((route) => route.isShownInSidebar);

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {sidebarItems.map((item) => (
            <li key={item.path} className={styles.item}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(styles.link, isActive && styles.active)
                }
              >
                {item.iconLabel}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
