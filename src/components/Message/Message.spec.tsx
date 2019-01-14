import { Message } from "components/Message/Message";
import { shallow } from "enzyme";
import * as React from "react";

describe("modules/Widget/Window", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Message />);
  });

  it("renders", () => {
    expect(component).toMatchSnapshot();
  });
});
