import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ThemeProviderDecorator } from "../../modules/ThemeProvider/ThemeProvider";
import { Message } from "./Message";
import { MessageGroup } from "./MessageGroup";

storiesOf("Message", module)
  .addDecorator(ThemeProviderDecorator)
  .add("default", () => <Message>Default Message</Message>)
  .add("message group", () => (
    <MessageGroup showAvatar={true}>
      <Message>Example #1</Message>
      <Message>Example #2</Message>
      <Message>Example #3</Message>
    </MessageGroup>
  ))
  .add("message group RTL", () => (
    <MessageGroup isRtl={true}>
      <Message>Example #1</Message>
      <Message>Example #2</Message>
      <Message>Example #3</Message>
    </MessageGroup>
  ));
