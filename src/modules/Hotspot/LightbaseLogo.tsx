import * as React from "react";
import Img from "react-image";
import styled from "styled-components";

type LightbaseLogoProps = {
  iconSrc?: string | null;
};

const LogoWrapper = styled("div")`
  & > svg {
    overflow: visible;
    transform: scale(0.3);
    margin-right: -5px;

    & :not(mask)[fill="#fff"] {
      fill: black;
    }

    & :not(mask)[fill="#000"] {
      fill: white;
    }

    & [stroke="#000"] {
      stroke: white;
    }
  }
`;

const defaultLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="110"
    height="110"
  >
    <defs>
      <path
        id="a"
        d="M5.043 29.468c-6.274-6.602-6.271-17.308.006-23.913 6.277-6.604 16.451-6.607 22.724-.006 6.274 6.602 6.271 17.308-.006 23.913s-16.451 6.607-22.724.006z"
      />
      <path id="c" d="M23.792 51.801L72.48.454 26.905.367.909 27.722z" />
      <path
        id="e"
        d="M31.807 55.238L6.335 30.542a17.74 17.74 0 0 1-1.006-.903c-6.84-6.632-6.826-17.397.031-24.045 6.857-6.648 17.961-6.661 24.8-.03.303.293.593.595.869.904l.06-.059 47.39 46.05-46.672 2.779z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="translate(17 75)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          fill="#000"
          d="M16.414-7.521l23.78 25.023-23.792 25.036-23.78-25.023z"
          mask="url(#b)"
        />
      </g>
      <g transform="translate(22 52)">
        <mask id="d" fill="#fff">
          <use xlinkHref="#c" />
        </mask>
        <path fill="#000" d="M49.648-24.69L73.601.514l-49.805 52.41L-.157 27.719z" mask="url(#d)" />
      </g>
      <g transform="translate(16)">
        <mask id="f" fill="#fff">
          <use xlinkHref="#e" />
        </mask>
        <path
          stroke="#000"
          strokeLinejoin="bevel"
          strokeWidth="15"
          d="M30.127 5.531c.302.293 53.509 52.197 53.509 52.197l-49.201.057L6.299 30.506a17.31 17.31 0 0 1-1.004-.9c-6.821-6.613-6.792-17.364.065-24.012s17.946-6.676 24.767-.063z"
          mask="url(#f)"
        />
      </g>
    </g>
  </svg>
);

const ImageContainer = styled("div")`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  overflow: hidden;
`;

export const customLogo = (iconSrc: string) => {
  return (
    <ImageContainer>
      <Img style={{ maxHeight: "95%", maxWidth: "95%" }} src={iconSrc} />
    </ImageContainer>
  );
};

export const LightbaseLogo = (props: LightbaseLogoProps) => {
  const { iconSrc } = props;

  return <LogoWrapper>{iconSrc ? customLogo(iconSrc) : defaultLogo()}</LogoWrapper>;
};
