import { StorageConstantsEnum, StorageInstance } from "lightbot-ssot/lib";
import _get from "lodash.get";
import { action, computed, observable, toJS } from "mobx";
import { MessageSenderEnum, MessageType, MessageTypeEnum } from "modules/Widget/modules/Message";
import { getAgentData, sendEvent, sendFeedback, sendMessage, startChat } from "utils/api";
import uuid from "uuid/v4";

import { ChatModalMessages } from "../ChatModal";
import { mergeMessages } from "../utils/mergeMessages";

type AgentData = {
  id: string;
  name?: string;
  avatar?: string;
  widgetInputPlaceholder?: string;
  widgetHotspotIcon?: string | null;
  widgetTeaser?: string | null;
  widgetThemeData?: { [propName: string]: string } | null;
};

/**
 * ChatStore controls the interaction between human and bot
 * It provides information about:
 *    started$ - The chat has been started and we have all the
 *        information needed to start a conversation
 *    agentName$ - The bot agent's name
 *    agentId$ - The bot agent's id
 *    messages$ - Message history of all the interactions
 */
export class ChatStore {
  private userId: string;
  private sessionId: string;

  @observable
  private isMobileVersion: boolean = false;
  @observable
  private isStarting: boolean = false;
  @observable
  private started: boolean = false;
  @observable
  private isTyping: boolean = false;
  @observable
  private agentData: AgentData;
  @observable
  private isOpen: boolean = false;
  @observable
  private messages: ChatModalMessages = observable([]);
  @observable
  private messagesCount: number = 0;

  constructor(agentData: AgentData, private storage = StorageInstance) {
    this.agentData = agentData;

    this.boot();
  }

  @action
  public async boot() {
    // Check existing data
    const userId = this.storage.getItem(StorageConstantsEnum.USER_ID);
    const sessionId = this.storage.getItem(StorageConstantsEnum.SESSION_ID);

    if (!userId) {
      this.userId = uuid();
      this.storage.setItem(StorageConstantsEnum.USER_ID, this.userId);
    } else {
      this.userId = userId;
    }

    if (!sessionId) {
      this.sessionId = uuid();
      this.storage.setItem(StorageConstantsEnum.SESSION_ID, this.sessionId, true);
    } else {
      this.sessionId = sessionId;
    }

    const shouldLoadFromStorage = !!(userId && sessionId);
    const existingAgentDataLoaded = await this.loadAgentData(shouldLoadFromStorage);
    if (existingAgentDataLoaded) {
      await this.loadIsOpenState(shouldLoadFromStorage);
      await this.loadMessagesHistory(shouldLoadFromStorage);
    }

    if (this.isOpen && !this.started) {
      await this.start();
    }
  }

  @action
  public async start() {
    this.isStarting = true;
    this.isTyping = true;

    const result = await startChat(this.sessionId, this.agentData.id);
    const botMessages = _get(result, ["data", "bot"], []);

    this.started = true;
    this.isOpen$ = true;
    this.isStarting = false;
    this.isTyping = false;
    this.appendMessage(botMessages, MessageSenderEnum.BOT);
  }

  @action
  public appendMessage(messages: MessageType[], sender: MessageSenderEnum) {
    if (!messages.length) {
      return;
    }

    this.messagesCount += this.messages.length;
    this.messages$ = mergeMessages(toJS(this.messages), messages, sender);

    if (sender === MessageSenderEnum.HUMAN && messages.length === 1) {
      this.isTyping = true;
      this.postMessage(messages[0].label);
    }
  }

  @action
  public appendJumpMessage(event: string, label: string, sender: MessageSenderEnum) {
    if (!event) {
      return;
    }

    this.messagesCount += 1;
    this.messages = mergeMessages(
      toJS(this.messages),
      [
        {
          label,
          type: MessageTypeEnum.PLAIN,
          sender,
        },
      ],
      sender,
    );

    if (sender === MessageSenderEnum.HUMAN && event) {
      this.isTyping = true;
      this.postJump(event);
    }
  }

  @action
  public touchedMessageGroup(messageGroupIndex: number) {
    this.messages$[messageGroupIndex].touched = true;
  }

  @computed
  public get agentData$() {
    return this.agentData;
  }
  public set agentData$(agentData: AgentData) {
    this.agentData = agentData;
  }

  @computed
  public get started$() {
    return this.started;
  }

  @computed
  public get messages$() {
    return this.messages;
  }
  public set messages$(messages: ChatModalMessages) {
    this.messages = messages;
    this.storage.setItem(StorageConstantsEnum.CHAT_HISTORY, JSON.stringify(this.messages));
  }

  @computed
  public get isOpen$() {
    return this.isOpen;
  }
  public set isOpen$(isOpen: boolean) {
    this.isOpen = isOpen;
    this.storage.setItem(StorageConstantsEnum.CHAT_IS_OPEN, isOpen ? "true" : "false");
  }

  @computed
  public get isTyping$() {
    return this.isTyping;
  }

  @computed
  public get isMobileVersion$() {
    return this.isMobileVersion;
  }
  public set isMobileVersion$(isMobileVersion: boolean) {
    this.isMobileVersion = isMobileVersion;
  }

  @computed
  public get messagesCount$() {
    return this.messagesCount;
  }

  @action
  public toggle$() {
    if (!this.isStarting && !this.started) {
      this.start();
    }

    this.isOpen$ = !this.isOpen;
  }

  @action
  public async sendFeedback(feedback: string) {
    sendFeedback(this.sessionId, this.agentData.id, feedback, toJS(this.messages));
  }

  @action
  private async postMessage(message: string) {
    const result = await sendMessage(this.userId, this.sessionId, this.agentData.id, message);
    const botMessages = _get(result, ["data", "bot"], []);

    this.isTyping = false;
    this.appendMessage(botMessages, MessageSenderEnum.BOT);
  }

  @action
  private async postJump(event: string) {
    const result = await sendEvent(this.userId, this.sessionId, this.agentData.id, event);
    const botMessages = _get(result, ["data", "bot"], []);

    this.isTyping = false;
    this.appendMessage(botMessages, MessageSenderEnum.BOT);
  }

  private async loadMessagesHistory(shouldLoadFromStorage: boolean) {
    if (!shouldLoadFromStorage) {
      return;
    }

    const rawMessagesHistory = this.storage.getItem(StorageConstantsEnum.CHAT_HISTORY);
    if (rawMessagesHistory) {
      try {
        const messagesHistory = JSON.parse(rawMessagesHistory);
        this.messages$ = messagesHistory;
        this.started = true;
      } catch (err) {
        // tslint:disable-next-line
        console.error("Error parsing local stored chat history. Resetting local history...");
        this.storage.removeItem(StorageConstantsEnum.CHAT_HISTORY);
      }
    }
  }

  private async loadAgentData(shouldLoadFromStorage: boolean): Promise<boolean> {
    let isAgentDataLoaded = false;

    if (shouldLoadFromStorage) {
      // Load from Local Storage
      const rawAgentData = this.storage.getItem(StorageConstantsEnum.CHAT_AGENT_DATA);
      if (rawAgentData) {
        try {
          const agentData = JSON.parse(rawAgentData);
          if (this.agentData.id === agentData.id) {
            this.agentData$ = Object.assign({}, this.agentData, agentData);
            isAgentDataLoaded = true;
          } else {
            // tslint:disable-next-line
            console.log(
              "Existing local stored agent data is out of date. Resetting local agent data...",
            );
            this.storage.removeItem(StorageConstantsEnum.CHAT_AGENT_DATA);
          }
        } catch (err) {
          // tslint:disable-next-line
          console.error("Error parsing local stored agent data. Resetting local agent data...");
          this.storage.removeItem(StorageConstantsEnum.CHAT_AGENT_DATA);
        }
      }
    }

    // Load from service
    if (!isAgentDataLoaded) {
      const result = await getAgentData(this.agentData.id);

      const agentData = {
        name: _get(result, ["data", "name"], "Lightbot"),
        widgetInputPlaceholder: _get(result, ["data", "widgetInputPlaceholder"], null),
        widgetTeaser: _get(result, ["data", "widgetTeaser"], null),
        widgetThemeData: _get(result, ["data", "widgetThemeData"], {}),
        widgetHotspotIcon: _get(result, ["data", "widgetHotspotIcon"], null),
      };

      this.agentData$ = Object.assign({}, this.agentData, agentData);
      this.storage.setItem(StorageConstantsEnum.CHAT_AGENT_DATA, JSON.stringify(this.agentData));
    }

    return isAgentDataLoaded;
  }

  private loadIsOpenState(shouldLoadFromStorage: boolean) {
    this.isOpen = false;
    if (shouldLoadFromStorage) {
      const rawIsChatOpen = this.storage.getItem(StorageConstantsEnum.CHAT_IS_OPEN);

      if (rawIsChatOpen === "true") {
        this.isOpen = true;
      }
    }
  }
}
