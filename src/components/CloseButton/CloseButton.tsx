import * as React from "react";
import styled from "styled-components";

export const CloseButton = styled<any, "button">("button")`
  border: none;
  outline: none;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: ${props => props.theme.closeButtonBackgroundColor || "rgba(0, 0, 0, 0.2)"};
  padding-bottom: 3px;
  color: ${props => props.theme.closeButtonColor || "#fff"};
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 4px #000;
  }
`;
