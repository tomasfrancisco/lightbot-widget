import { MessageSenderEnum, MessageTypeEnum } from "./Message.type";

export const fetchingMessage = {
  label: "Typing...",
  sender: MessageSenderEnum.BOT,
  type: MessageTypeEnum.FETCHING,
};
