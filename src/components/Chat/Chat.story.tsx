import { storiesOf } from "@storybook/react";
import * as React from "react";
import { FaAngleDown } from "react-icons/lib/fa";
import { ThemeProviderDecorator } from "../../modules/ThemeProvider/ThemeProvider";
import { Button } from "../Button";
import { Message, MessageGroup } from "../Message";
import { MessageComposer } from "../MessageComposer";
import { Chat, ChatBody, ChatFooter, ChatHeader } from "./";

const footerHeight = "50px";

storiesOf("Chat", module)
  .addDecorator(ThemeProviderDecorator)
  .add("default", () => (
    <Chat>
      <ChatHeader>
        <Button touched={false}>...</Button>
        <h4>Bot name</h4>
        <FaAngleDown size={25} />
      </ChatHeader>
      <ChatBody messagesCount={1} footerHeight={footerHeight}>
        <MessageGroup>
          <Message>Example message</Message>
        </MessageGroup>
      </ChatBody>
      <ChatFooter height={footerHeight}>
        <MessageComposer />
      </ChatFooter>
    </Chat>
  ));
