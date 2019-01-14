import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ThemeProviderDecorator } from "../../modules/ThemeProvider/ThemeProvider";
import { MessageComposer } from "./MessageComposer";

storiesOf("MessageComposer", module)
  .addDecorator(ThemeProviderDecorator)
  .add("default", () => <MessageComposer />);
