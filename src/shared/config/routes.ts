import type { IconName } from "../ui";

export type AppRouteMeta = {
  path: string;
  title: string;
  isShownInSidebar?: boolean;
  iconName?: IconName;
};

export const appRouteMeta: AppRouteMeta[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    isShownInSidebar: true,
    iconName: "dashboard",
  },
  {
    path: "/history",
    title: "History",
    isShownInSidebar: true,
    iconName: "tasks",
  },
  {
    path: "/auth",
    title: "Auth",
  },
];
