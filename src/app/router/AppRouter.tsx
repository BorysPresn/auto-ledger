import { Navigate, Route, Routes } from "react-router-dom";
import { AuthPage, DashboardPage, HistoryPage } from "../../pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
