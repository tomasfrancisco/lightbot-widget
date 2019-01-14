import * as React from "react";
import styled, { keyframes } from "styled-components";

import { highestZIndex } from "../../constants/highestZIndex";

type HotspotTeaserProps = {
  value: string;
};

const displayAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled("div")`
  position: fixed;
  bottom: 100px;
  right: 20px;
  background-color: white;
  border-radius: 25px;
  padding: 10px 15px;
  color: #4c4c4c;
  font-family: "Assistant", sans-serif;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  opacity: 0;
  animation: ${displayAnimation} 0.5s cubic-bezier(0, 0.2, 0.8, 1);
  animation-fill-mode: forwards;
  z-index: ${highestZIndex};
  white-space: pre-line;

  &:before {
    content: "";
    position: absolute;
    display: block;
    width: 10px;
    height: 10px;
    background-color: white;
    bottom: -5px;
    right: 30px;
    transform: rotate(45deg);
  }
`;

export const HotspotTeaser = (props: HotspotTeaserProps) => <Wrapper>{props.value}</Wrapper>;
