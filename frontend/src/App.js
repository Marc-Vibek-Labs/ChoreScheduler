import { AppRoutes } from "./routes";
import { AppProvider } from "./components/AppProvider";

export const App = () => {
  return <AppProvider>{<AppRoutes />}</AppProvider>;
};
