import { Provider } from "mobx-react";
import * as React from "react";

export const storeProvider = ({ ...stores }) => children => (
  <Provider {...stores}>{children}</Provider>
);
