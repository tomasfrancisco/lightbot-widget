import { shallow } from "enzyme";
import { HotspotButton } from "modules/Hotspot/HotspotButton";
import { ChatStore } from "modules/Widget/modules/ChatModal";
import * as React from "react";
import { getBrowserStorageMock } from "utils/tests/browserStorageMock";
import { storeProvider } from "utils/tests/storeProvider";

describe("modules/Widget/Window", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      storeProvider({
        chatStore: new ChatStore({ id: "agentId" }, getBrowserStorageMock()),
      })(<HotspotButton />),
    );
  });

  it("renders", () => {
    expect(component).toMatchSnapshot();
  });
});
