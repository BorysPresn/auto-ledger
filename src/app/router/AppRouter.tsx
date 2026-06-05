import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage, DashboardPage, HistoryPage } from "../../pages";
import { appRouteMeta } from "../../shared/config/routes";

const pageByPath = {
  "/dashboard": <DashboardPage />,
  "/history": <HistoryPage />,
  "/auth": <AuthPage />,
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {appRouteMeta.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={pageByPath[route.path as keyof typeof pageByPath]}
        />
      ))}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
