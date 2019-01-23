import { Button } from "components/Button";
import { Link } from "components/Link";
import { Message } from "components/Message";
import * as React from "react";
import Linkify from "react-linkify";
import { v4 as uuid } from "uuid";

import { FetchingMessage } from "./FetchingMessage";
import {
   JumpMessage, LinkMessage, MessageSenderEnum, MessageType, MessageTypeEnum,
} from "./Message.type";

export class MessageModule extends React.Component<{
  message: MessageType;
  sender: MessageSenderEnum;
  touched?: boolean;
  onClick?: (message: string, label?: string, type?: MessageTypeEnum) => void;
}> {
  public render() {
    const { sender, ...props } = this.props;
    return (
      <Message isBotMessage={sender === MessageSenderEnum.BOT} {...props}>
        {this.decodeMessage(this.props.message)}
      </Message>
    );
  }

  private decodeMessage = (message: MessageType) => {
    const { touched } = this.props;

    switch (message.type) {
      case MessageTypeEnum.PLAIN:
        return (
          <span key={uuid()}>
            <Linkify properties={{ target: "_blank" }}>{message.label}</Linkify>
          </span>
        );
      case MessageTypeEnum.JUMP:
        const jumpMessage = message as JumpMessage;
        return jumpMessage.jumps.map(jump => (
          <Button
            key={uuid()}
            negative={true}
            onClick={this.getOnButtonClick(jump.event, jump.label)}
            touched={touched ? touched : false}
          >
            {jump.label}
          </Button>
        ));
      case MessageTypeEnum.LINK:
        const linkMessage = message as LinkMessage;
        return (
          <Link key={uuid()} href={linkMessage.link} target="_blank">
            {linkMessage.label || linkMessage.link}
          </Link>
        );
      case MessageTypeEnum.DECORATED:
        return <p key={uuid()}>{this.decodeDecoratedType(message)}</p>;
      case MessageTypeEnum.FETCHING:
        return <FetchingMessage />;
      default:
        return null;
    }
  };

  private getOnButtonClick = (event: string, label?: string) => {
    const { onClick } = this.props;

    if (onClick) {
      return () => onClick(event, label, MessageTypeEnum.JUMP);
    }

    return undefined;
  };

  private decodeDecoratedType = message => {
    const messageSubstrings = message.label.split(/{\d}/);
    return messageSubstrings.reduce(
      (result, substring, i) => [
        ...result,
        this.decodeMessage({
          label: substring,
          sender: message.sender,
          type: MessageTypeEnum.PLAIN,
        }),
        i < messageSubstrings.length - 1 ? this.decodeMessage(message.objects[i]) : null,
      ],
      [],
    );
  };
}
