import { theme as globalTheme } from "@lightbot/widget-configuration";
import * as React from "react";
import { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import * as WebFont from "webfontloader";

const getProvider = props => ({ document, window }) => {
  WebFont.load({
    context: window,
    google: {
      families: ["Assistant"],
    },
  });

  return (
    <StyleSheetManager target={document.head}>
      <ThemeProvider theme={globalTheme}>{props.children}</ThemeProvider>
    </StyleSheetManager>
  );
};

export const FrameProvider = props => (
  <FrameContextConsumer>{getProvider(props)}</FrameContextConsumer>
);
