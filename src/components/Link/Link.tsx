import { darken } from "polished";
import styled from "styled-components";

export const Link = styled<any, "a">("a")`
  color: ${props => props.theme.linkColor};

  &:visited {
    color: ${props => props.theme.linkColor};
  }

  &:active {
    color: ${props => darken(0.2, props.theme.linkColor ? props.theme.linkColor : "#4c4c4c")};
  }
`;
