import * as React from "react";
import { FaTimesCircle } from "react-icons/lib/fa";
import styled from "styled-components";

import { LightbaseLogo } from "./LightbaseLogo";

type HotspotButtonProps = {
  isOpen?: boolean;
  isMobileVersion?: boolean;
  onClick?: () => void;
  iconSrc?: string | null;
};

export const ButtonWrapper = styled<HotspotButtonProps, "button">("button")`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0;
  border: none;
  outline: none;
  border-radius: 100%;
  border-bottom-right-radius: 10px;
  color: white;
  cursor: pointer;
  margin: 20px;
  transition: all 0.4s ease-in-out;
  z-index: 2147483640;
  width: 70px;
  height: 70px;
  background-color: white;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  padding: 5px;

  &:hover {
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.8);
  }

  ${props =>
    props.isOpen &&
    `
    transform: rotate(-180deg);
  `};
`;

const ButtonContent = styled<HotspotButtonProps, "div">("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  cursor: pointer;
  border-radius: 100%;
  border-bottom-right-radius: 10px;
  transition: all 0.4s ease-in-out;
  opacity: 1;
  ${props => `
    background-color: ${
      props.theme.hotspotButtonColor ? props.theme.hotspotButtonColor : "black"
    }`};

  ${props =>
    props.isOpen &&
    `
    background-color: ${
      props.isMobileVersion
        ? "transparent"
        : props.theme.hotspotButtonColor
        ? props.theme.hotspotButtonColor
        : "black"
    };
    color: ${props.theme.closeButtonColor ? props.theme.closeButtonColor : "#252b2d"};
    opacity: ${props.isMobileVersion ? 0 : 1};
  `};
`;

export const HotspotButton = (props: HotspotButtonProps) => {
  const { onClick, isOpen, isMobileVersion, iconSrc } = props;

  return (
    <ButtonWrapper onClick={onClick} isOpen={isOpen} isMobileVersion={isMobileVersion}>
      <ButtonContent isOpen={isOpen}>
        {isOpen ? <FaTimesCircle size={25} /> : <LightbaseLogo iconSrc={iconSrc} />}
      </ButtonContent>
    </ButtonWrapper>
  );
};
