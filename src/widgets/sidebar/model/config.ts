export interface SidebarNavLink  {
    path: string;
    title: string;
}

export const sidebarNavLinks: SidebarNavLink[] = [
    {
        path: "/",
        title: "Dashboard"
    },
    {
        path: "/history",
        title: "History"
    },
]