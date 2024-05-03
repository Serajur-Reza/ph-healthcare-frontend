"use client";

import React from "react";
import { theme } from "../theme/theme";
import { ThemeProvider } from "@mui/material";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
