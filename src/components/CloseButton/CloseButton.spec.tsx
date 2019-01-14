import { CloseButton } from "components/CloseButton/CloseButton";
import { shallow } from "enzyme";
import * as React from "react";

describe("modules/Widget/Window", () => {
  let component;

  beforeEach(() => {
    component = shallow(<CloseButton />);
  });

  it("renders", () => {
    expect(component).toMatchSnapshot();
  });
});
