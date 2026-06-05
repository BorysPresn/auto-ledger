export type AppRouteMeta = {
  path: string;
  title: string;
  isShownInSidebar?: boolean;
  iconLabel?: string;
};

export const appRouteMeta: AppRouteMeta[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    isShownInSidebar: true,
    iconLabel: "D",
  },
  {
    path: "/history",
    title: "History",
    isShownInSidebar: true,
    iconLabel: "H",
  },
  {
    path: "/auth",
    title: "Auth",
  },
];
