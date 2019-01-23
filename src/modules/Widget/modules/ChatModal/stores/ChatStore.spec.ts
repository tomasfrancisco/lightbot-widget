import { StorageConstantsEnum } from "lightbot-ssot/lib";
import { ChatStore } from "modules/Widget/modules/ChatModal/stores/ChatStore";
import { getBrowserStorageMock } from "utils/tests/browserStorageMock";

const createStore = ({ isOpen, sessionId, userId }) =>
  new ChatStore(
    { id: "agentId" },
    getBrowserStorageMock({
      localStorage: {
        getItem: key => {
          if (key.includes(StorageConstantsEnum.USER_ID)) {
            return userId;
          }

          if (key.includes(StorageConstantsEnum.CHAT_IS_OPEN)) {
            return isOpen ? "true" : "false";
          }
        },
        setItem: (key, newValue) => {
          return;
        },
      },
      sessionStorage: {
        getItem: key => {
          if (key.includes(StorageConstantsEnum.SESSION_ID)) {
            return sessionId;
          }
        },
        setItem: (key, newValue) => {
          return;
        },
      },
    }),
  );

describe("modules/Widget/modules/ChatModal/stores/ChatStore", () => {
  describe("initial state with isOpen false", () => {
    let isOpen;
    let chatStore;

    beforeEach(() => {
      isOpen = false;
      chatStore = createStore({
        isOpen,
        sessionId: "sessionId",
        userId: "userId",
      });
    });

    it("started is false", () => {
      expect(chatStore.started$).toBeFalsy();
    });

    it("passes down param isOpen", () => {
      expect(chatStore.isOpen$).toEqual(isOpen);
    });
  });

  describe("initial state with isOpen true", () => {
    let isOpen;
    let chatStore;

    beforeEach(() => {
      isOpen = true;
      chatStore = createStore({ isOpen, sessionId: "sessionId", userId: "userId" });
    });

    it("started is false", () => {
      expect(chatStore.started$).toBeFalsy();
    });

    it("passes down param isOpen", () => {
      expect(chatStore.isOpen$).toEqual(isOpen);
    });
  });

  describe("toggle$()", () => {
    let isOpen;
    let chatStore;

    beforeEach(() => {
      isOpen = false;
      chatStore = createStore({ isOpen, sessionId: "sessionId", userId: "userId" });
    });

    describe("started$ is false", () => {
      let startSpy;

      beforeEach(() => {
        startSpy = jest.spyOn(chatStore, "start");
        chatStore.toggle$();
      });

      it("started$ is false", () => {
        expect(chatStore.started$).toBeFalsy();
      });

      it("calls start method", () => {
        expect(startSpy).toHaveBeenCalled();
      });

      it("toggle isOpen value", () => {
        expect(chatStore.isOpen$).toBeTruthy();
      });
    });

    describe("started$ is true", () => {
      let startSpy;

      beforeEach(() => {
        chatStore.started = true;
        startSpy = jest.spyOn(chatStore, "start");
        chatStore.toggle$();
      });

      it("started$ is true", () => {
        expect(chatStore.started$).toBeTruthy();
      });

      it("doesn't call start method", () => {
        expect(startSpy).not.toHaveBeenCalled();
      });
    });
  });
});
