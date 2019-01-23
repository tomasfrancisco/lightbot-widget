import { Button } from "components/Button";
import { shallow } from "enzyme";
import { theme } from "lightbot-ssot/lib";
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
