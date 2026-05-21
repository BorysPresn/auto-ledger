export interface HeaderNavLink  {
    path: string;
    title: string;
}

export const headerNavLinks: HeaderNavLink[] = [
    {
        path: "/",
        title: "Dashboard"
    },
    {
        path: "/history",
        title: "History"
    },
]