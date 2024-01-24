import { AppRoutes } from "./routes";
import { AppProvider } from "./components/AppProvider";
import ToggleColorMode from "./components/ToggleColorMode";

export const App = () => {
  return (
    <>
      <ToggleColorMode />
      <AppProvider>{<AppRoutes />}</AppProvider>
    </>
  );
};
