import { shallow } from "enzyme";
import { ChatStore } from "modules/Widget/modules/ChatModal";
import { Widget } from "modules/Widget/Widget";
import * as React from "react";
import { getBrowserStorageMock } from "utils/tests/browserStorageMock";
import { storeProvider } from "utils/tests/storeProvider";

describe("modules/Widget/Window", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      storeProvider({
        chatStore: new ChatStore({ id: "agentId" }, getBrowserStorageMock()),
      })(<Widget />),
    );
  });

  it("renders", () => {
    expect(component).toMatchSnapshot();
  });
});
