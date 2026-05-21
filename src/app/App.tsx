import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { AppHeader } from "../widgets";

export const App = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <AppRouter />
    </BrowserRouter>
  );
};
