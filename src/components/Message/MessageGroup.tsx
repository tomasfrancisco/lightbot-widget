import * as React from "react";
import styled from "styled-components";

import { MessageProps } from "./Message";

type MessageGroupWrapperProps = {
  isRtl?: boolean;
};

export const MessageGroupWrapper = styled<MessageGroupWrapperProps, "div">("div")`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: ${props => (props.isRtl ? "flex-end" : "flex-start")};

  &:not(:first-of-type) {
    margin-top: 10px;
  }

  & > .avatar-container {
    order: ${props => (props.isRtl ? 2 : 1)};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    ${props => (props.isRtl ? "margin-left" : "margin-right")}: 5px;

    & > .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 25px;
      margin-bottom: 5px;
      background-color: tomato;
      color: white;
    }
  }

  & > .message-container {
    order: ${props => (props.isRtl ? 1 : 2)};
    display: flex;
    flex-flow: column;
  }


  & .message-wrapper {
    &:not(:only-of-type) {
      &:first-of-type .message-tag {
        border-bottom-${props => (props.isRtl ? "right" : "left")}-radius: 4px;
      }

      &:not(:first-of-type):not(:last-of-type) .message-tag {
        border-bottom-${props => (props.isRtl ? "right" : "left")}-radius: 4px;
        border-top-${props => (props.isRtl ? "right" : "left")}-radius: 4px;
      }

      &:last-of-type .message-tag {
        border-top-${props => (props.isRtl ? "right" : "left")}-radius: 4px;
      }
    }
  }
`;

interface MessageGroupProps extends MessageProps {
  children?: any;
  isRtl?: boolean;
  showAvatar?: boolean;
  avatarName?: string;
  onClick?: (event) => void;
}

const passPropsDown = ({ children, ...props }: MessageGroupProps) =>
  React.Children.map(children, child => React.cloneElement(child as any, props));

const renderAvatar = avatarName => {
  return (
    <div className="avatar-container">
      <div className="avatar">{avatarName && avatarName.charAt(0)}</div>
    </div>
  );
};

export const MessageGroup = (props: MessageGroupProps) => {
  const { isRtl, showAvatar, avatarName, onClick, ...rest } = props;
  return (
    <MessageGroupWrapper isRtl={isRtl} onClick={onClick}>
      {showAvatar && renderAvatar(avatarName)}
      <div className="message-container">{passPropsDown(rest)}</div>
    </MessageGroupWrapper>
  );
};
