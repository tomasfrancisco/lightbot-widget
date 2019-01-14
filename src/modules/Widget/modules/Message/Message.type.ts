export enum MessageTypeEnum {
  PLAIN = "plain",
  LINK = "link",
  JUMP = "jump",
  DECORATED = "decorated",
  FETCHING = "fetching",
}

export enum MessageSenderEnum {
  HUMAN = "HUMAN",
  BOT = "BOT",
  SUPPORTER = "SUPPORTER",
}

interface IMessage {
  type: MessageTypeEnum;
  sender: MessageSenderEnum;
}

export interface PlainMessage extends IMessage {
  label: string;
}

export interface LinkMessage extends IMessage {
  label: string;
  link: string;
}

export interface JumpMessage extends IMessage {
  jumps: Array<{
    label: string;
    event: string;
  }>;
  label: string;
}

export interface DecoratedMessage extends IMessage {
  label: string;
  objects: MessageType[];
}

export interface FetchingMessage extends IMessage {
  label: string;
}

export type MessageType =
  | PlainMessage
  | LinkMessage
  | JumpMessage
  | DecoratedMessage
  | FetchingMessage;
