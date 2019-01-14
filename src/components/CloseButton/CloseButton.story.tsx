import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ThemeProviderDecorator } from "../../modules/ThemeProvider";
import { CloseButton } from "./CloseButton";

storiesOf("CloseButton", module)
  .addDecorator(ThemeProviderDecorator)
  .add("default", () => <CloseButton>X</CloseButton>);
