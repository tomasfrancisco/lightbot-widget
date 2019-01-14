import { Chat, ChatBody, ChatFooter, ChatHeader } from "components/Chat";
import { CloseButton } from "components/CloseButton";
import { MessageGroup } from "components/Message";
import { MessageComposer } from "components/MessageComposer";
import _get from "lodash.get";
import { reaction, toJS } from "mobx";
import { inject, observer } from "mobx-react";
import * as React from "react";
import CloseIcon from "react-icons/lib/fa/chevron-down";
import { v4 as uuid } from "uuid";

import {
  MessageModule as Message,
  MessageSenderEnum,
  MessageType,
  MessageTypeEnum,
} from "../Message";
import { fetchingMessage } from "../Message/constants";
import { ChatStore } from "./stores/ChatStore";

const footerHeight = "60px";

export type ChatModelMessageGroup = {
  touched?: boolean;
  messages: MessageType[];
  sender: MessageSenderEnum;
};
export type ChatModalMessages = ChatModelMessageGroup[];

@inject("chatStore")
@observer
export class ChatModal extends React.Component<{
  chatStore?: ChatStore;
  onSubmit: (message: string, label?: string, type?: MessageTypeEnum) => void;
}> {
  private messageComposerInputRef;

  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    const { chatStore } = this.props;
    if (!chatStore) {
      throw Error("ChatModal could not be initialized without a provided ChatStore");
    }

    this.watchMessageComposerChanges(chatStore);
  }

  public render() {
    const { chatStore, onSubmit } = this.props;

    if (!chatStore) {
      return null;
    }

    const { agentData$, messagesCount$, isTyping$ } = chatStore;

    return (
      <Chat>
        <ChatHeader>
          <span>{agentData$.name}</span>
          {this.renderCloseButton()}
        </ChatHeader>
        <ChatBody messagesCount={messagesCount$} footerHeight={footerHeight}>
          {this.renderMessages()}
        </ChatBody>
        <ChatFooter height={footerHeight}>
          <MessageComposer
            assignRef={this.assignMessageComposerInputRef}
            touched={isTyping$}
            onSubmit={onSubmit}
            replyPlaceholder={agentData$.widgetInputPlaceholder}
          />
        </ChatFooter>
      </Chat>
    );
  }

  private renderCloseButton() {
    const { chatStore } = this.props;
    if (!chatStore) {
      return null;
    }
    const { isMobileVersion$ } = chatStore;
    return (
      isMobileVersion$ && (
        <CloseButton onClick={this.onCloseButtonClick}>
          <CloseIcon />
        </CloseButton>
      )
    );
  }

  private renderMessages() {
    const { chatStore } = this.props;
    if (!chatStore) {
      return null;
    }

    const { messages$, isTyping$ } = chatStore;

    const messageHistory = toJS(messages$).map((messageGroup: ChatModelMessageGroup, i) => (
      <MessageGroup
        key={uuid()}
        onClick={this.getOnMessageGroupClickHandler(i)}
        {...this.getMessageUIProps(messageGroup.sender)}
      >
        {this.renderMessage(messageGroup)}
      </MessageGroup>
    ));

    const typingMessage = isTyping$ ? (
      <MessageGroup key={uuid()} {...this.getMessageUIProps(MessageSenderEnum.BOT)}>
        <Message
          key={uuid()}
          message={fetchingMessage}
          sender={MessageSenderEnum.BOT}
          onClick={this.props.onSubmit}
        />
      </MessageGroup>
    ) : null;

    return (
      <React.Fragment>
        {messageHistory}
        {typingMessage}
      </React.Fragment>
    );
  }

  private renderMessage = (messageGroup: ChatModelMessageGroup) => {
    return messageGroup.messages.map(message => (
      <Message
        key={uuid()}
        message={message}
        sender={messageGroup.sender}
        onClick={this.props.onSubmit}
        touched={messageGroup.touched}
      />
    ));
  };

  private assignMessageComposerInputRef = messageComposerInputRef => {
    this.messageComposerInputRef = messageComposerInputRef;
  };

  private watchMessageComposerChanges = (store: ChatStore) => {
    reaction(
      () => {
        return store.isOpen$ && !store.isTyping$;
      },
      () => {
        this.focusOnMessageComposer();
      },
      {
        equals: (from, to) => from && !to,
        fireImmediately: true,
      },
    );
  };

  private focusOnMessageComposer = () => {
    if (!this.messageComposerInputRef) {
      return;
    }
    setTimeout(() => this.messageComposerInputRef.focus(), 200);
  };

  private getMessageUIProps(sender: MessageSenderEnum) {
    const { chatStore } = this.props;

    const agentName = _get(chatStore, ["agentData$", "name"], "");

    switch (sender) {
      case MessageSenderEnum.HUMAN:
        return {
          borderRadius: "25px",
          isRtl: true,
        };
      case MessageSenderEnum.BOT:
        return {
          borderRadius: "25px",
          isRtl: false,
          secondary: true,
          showAvatar: true,
          avatarName: agentName,
        };
      default:
        return {};
    }
  }

  private onCloseButtonClick = () => {
    const { chatStore } = this.props;
    if (chatStore) {
      chatStore.toggle$();
    }
  };

  private getOnMessageGroupClickHandler(messageGroupIndex: number) {
    return event =>
      _get(event, ["target", "tagName"]) === "BUTTON"
        ? this.touchedMessageGroupActions(messageGroupIndex)
        : null;
  }

  private touchedMessageGroupActions = (messageGroupIndex: number) => {
    if (this.props.chatStore) {
      this.props.chatStore.touchedMessageGroup(messageGroupIndex);
    }
  };
}
