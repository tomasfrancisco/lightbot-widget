import { ChatModalMessages } from "..";
import { MessageSenderEnum, MessageType } from "../../Message";

export const mergeMessages = (
  previousMessages: ChatModalMessages,
  newMessageGroup: MessageType[],
  newMessageSender: MessageSenderEnum,
): ChatModalMessages => {
  const lastMessageGroup = previousMessages[previousMessages.length - 1];

  if (lastMessageGroup && lastMessageGroup.sender === newMessageSender) {
    previousMessages[previousMessages.length - 1] = {
      ...lastMessageGroup,
      messages: lastMessageGroup.messages.concat(newMessageGroup),
    };
  } else {
    previousMessages = previousMessages.concat({
      messages: newMessageGroup,
      sender: newMessageSender,
    });
  }

  return previousMessages;
};
