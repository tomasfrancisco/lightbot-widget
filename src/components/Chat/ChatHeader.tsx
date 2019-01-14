import styled from "styled-components";

export const ChatHeader = styled<any, "header">("header")`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  border-bottom: 1px solid rgb(221, 226, 230);
  align-items: center;
  justify-content: space-between;
  padding: 9px 50px;
  font-weight: bold;
  color: ${props => props.theme.headerTextColor || "white"};
  background-image: ${props =>
    `linear-gradient(to right, ${
      props.theme.headerBackgroundColor1 ? props.theme.headerBackgroundColor1 : "#4facfe"
    }  0%, ${
      props.theme.headerBackgroundColor2 ? props.theme.headerBackgroundColor2 : "#00f2fe"
    } 100%)` || "black"};
`;
