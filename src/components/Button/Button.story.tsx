import { ThemeProviderDecorator } from "modules/ThemeProvider/ThemeProvider";
import * as React from "react";

import { storiesOf } from "@storybook/react";

import { Button } from "./Button";

storiesOf("Button", module)
  .addDecorator(ThemeProviderDecorator)
  .add("default", () => <Button touched={false}>DEFAULT</Button>)
  .add("touched", () => <Button touched={true}>touched</Button>)
  .add("negative", () => (
    <Button touched={false} negative={true}>
      DEFAULT
    </Button>
  ))
  .add("negative & touched", () => (
    <Button negative={true} touched={true}>
      touched
    </Button>
  ));
