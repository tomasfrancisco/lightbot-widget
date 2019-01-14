import { Chat } from "components/Chat";
import { shallow } from "enzyme";
import * as React from "react";

describe("modules/Widget/Window", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Chat />);
  });

  it("renders", () => {
    expect(component).toMatchSnapshot();
  });
});
