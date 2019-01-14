import { shallow } from "enzyme";
import * as React from "react";
import { getBrowserStorageMock } from "utils/tests/browserStorageMock";

import { ChatStore } from "../Widget/modules/ChatModal";
import { Hotspot } from "./Hotspot";
import { ButtonWrapper, HotspotButton } from "./HotspotButton";

describe("modules/Hotspot", () => {
  let component;
  const chatStore = new ChatStore(
    {
      id: "agentId",
      widgetThemeData: null,
    },
    getBrowserStorageMock(),
  );

  beforeEach(() => {
    component = shallow(<Hotspot chatStore={chatStore} />).dive();
  });

  describe("onClick", () => {
    beforeEach(() => {
      chatStore.start = jest.fn();
      chatStore.toggle$ = jest.fn();

      const hotspotComponent = component.find(HotspotButton).dive();
      hotspotComponent.find(ButtonWrapper).simulate("click");
    });

    it("calls chatStore toggle$ method", () => {
      expect(chatStore.toggle$).toBeCalled();
    });
  });
});
