import { theme } from "@lightbot/widget-configuration";
import { Button } from "components/Button";
import { shallow } from "enzyme";
import * as React from "react";

describe("components/Button", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Button theme={theme} touched={false} />);
  });

  it("renders", () => {
    expect(component).toMatchSnapshot();
  });
});
