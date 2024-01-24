import React from "react";
import { App } from "./App";
import theme from "./theme/theme";
import { createRoot } from "react-dom/client";
import { ColorModeScript } from "@chakra-ui/color-mode";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
);
