import { WidgetThemeProps } from "lightbot-ssot/lib";
import { darken, lighten } from "polished";
import * as React from "react";
import styled, { ThemedOuterStyledProps } from "styled-components";

type ButtonProps = {
  color?: string;
  negative?: boolean;
  touched?: boolean;
};

export const Button = styled<ThemedOuterStyledProps<ButtonProps, WidgetThemeProps>, "button">(
  "button",
)`
  font-size: 14px;
  margin: 0px 1px;
  background-color: ${props => props.theme.btnPrimaryBackgroundColor};
  border: 1px solid transparent;
  border-radius: 100px;
  padding: 10px 15px;
  color: white;
  cursor: pointer;

  &:not(:only-of-type) {
    &:not(:first-of-type) {
      margin-top: 5px;
    }
  }

  &:hover {
    background-color: ${props => darken(0.1, props.color || props.theme.btnPrimaryBackgroundColor)};
    ${props => (props.negative ? "color: white" : null)};
  }

  &:active {
    background-color: ${props => darken(0.2, props.theme.btnPrimaryBackgroundColor)};
  }

  &:focus {
    outline: ${props => props.theme.outline};
  }

  ${props =>
    props.negative &&
    `
      background-color: transparent;
      border: 1px solid currentColor;
      color: ${props.color || props.theme.btnPrimaryColor};
    `};

  ${props =>
    props.touched &&
    `
      background-color: ${lighten(0.2, props.theme.btnPrimaryBackgroundColor)};
      color: white;
    `};
`;
