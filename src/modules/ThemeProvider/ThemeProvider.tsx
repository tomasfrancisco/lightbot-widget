import { theme } from "lightbot-ssot/lib";
import * as React from "react";
import { ThemeProvider as Provider } from "styled-components";

export const ThemeProvider = props => (
  <Provider theme={Object.assign({}, theme, props.theme)}>{props.children}</Provider>
);

export const ThemeProviderDecorator = story => <ThemeProvider>{story()}</ThemeProvider>;
