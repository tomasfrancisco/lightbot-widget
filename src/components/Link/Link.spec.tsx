import { Link } from "components/Link/Link";
import { shallow } from "enzyme";
import * as React from "react";

describe("modules/Widget/Window", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Link />);
  });

  it("renders", () => {
    expect(component).toMatchSnapshot();
  });
});
