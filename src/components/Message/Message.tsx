import * as React from "react";
import styled, { ThemedStyledProps, withTheme } from "styled-components";

const getBackgroundColor = (props: ThemedStyledProps<MessageTagProps, any>) =>
  props.isBotMessage
    ? props.theme.botSaysBackgroundColor || "#F2F2F2"
    : props.theme.userSaysBackgroundColor || "#4facfe";

const getTextColor = (props: ThemedStyledProps<MessageTagProps, any>) =>
  props.isBotMessage
    ? props.theme.botSaysTextColor || "#4C4C4C"
    : props.theme.userSaysTextColor || "white";

export type MessageTagProps = {
  isBotMessage?: boolean;
};

const MessageTag = withTheme(styled<MessageTagProps, "div">("div")`
  margin: 1px 0;
  padding: 10px 15px;
  background-color: ${props => getBackgroundColor(props)};
  border-radius: 25px;
  color: ${props => getTextColor(props)};
  font-family: "Assistant", sans-serif;
  max-width: 290px;
  float: ${props => (props.isBotMessage ? "left" : "right")};
`);

const MessageWrapper = styled("div")`
  display: block;
`;

export interface MessageProps {
  children?: any;
  isBotMessage?: boolean;
}

export const Message = (props: MessageProps) => {
  const { children, isBotMessage } = props;
  return (
    <MessageWrapper className="message-wrapper">
      <MessageTag className="message-tag" isBotMessage={isBotMessage}>
        {children}
      </MessageTag>
    </MessageWrapper>
  );
};
