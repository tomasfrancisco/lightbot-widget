import { inject, observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";
import { ThemeProvider } from "../ThemeProvider/ThemeProvider";
import { ChatModal } from "./modules/ChatModal";
import { ChatStore } from "./modules/ChatModal/stores/ChatStore";
import { MessageSenderEnum, MessageTypeEnum } from "./modules/Message";

const GlobalStyles = styled.div`
  & * {
    font-family: "Assistant", sans-serif;
  }

  & p {
    margin: 0;
  }
`;

@inject("chatStore")
@observer
export class Window extends React.Component<
  {
    chatStore?: ChatStore;
    agentId: string;
  },
  {}
> {
  public render() {
    if (!this.props.chatStore) {
      return null;
    }

    const { started$, agentData$ } = this.props.chatStore;

    if (!started$) {
      return null;
    }
    return (
      <ThemeProvider theme={agentData$.widgetThemeData}>
        <GlobalStyles>
          <ChatModal onSubmit={this.onSubmitMessage} />
        </GlobalStyles>
      </ThemeProvider>
    );
  }

  private onSubmitMessage = async (message: string, label?: string, type?: MessageTypeEnum) => {
    const { chatStore } = this.props;

    if (chatStore) {
      if (type === MessageTypeEnum.JUMP) {
        if (!label) {
          throw new Error("A Jump was triggered without providing a proper label.");
        }

        chatStore.appendJumpMessage(message, label, MessageSenderEnum.HUMAN);
      } else {
        chatStore.appendMessage(
          [
            {
              label: label || message,
              sender: MessageSenderEnum.HUMAN,
              type: MessageTypeEnum.PLAIN,
            },
          ],
          MessageSenderEnum.HUMAN,
        );
      }
    }
  };
}
