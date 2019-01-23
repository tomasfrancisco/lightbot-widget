import { shallow } from "enzyme";
import { ChatStore } from "modules/Widget/modules/ChatModal";
import { Window } from "modules/Widget/Window";
import * as React from "react";
import { getBrowserStorageMock } from "utils/tests/browserStorageMock";
import { storeProvider } from "utils/tests/storeProvider";

describe("modules/Widget/Window", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      storeProvider({
        chatStore: new ChatStore({ id: "agentId" }, getBrowserStorageMock()),
      })(<Window agentId={"agentId"} />),
    );
  });

  it("renders", () => {
    expect(component).toMatchSnapshot();
  });
});
