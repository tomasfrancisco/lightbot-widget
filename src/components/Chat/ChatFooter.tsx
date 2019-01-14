import styled from "styled-components";

type ChatFooterProps = {
  height: string;
};

export const ChatFooter = styled<ChatFooterProps, "footer">("footer")`
  position: absolute;
  display: flex;
  bottom: 0;
  width: 100%;
  height: ${props => props.height};
  background-color: white;
  border-top: 1px solid rgb(221, 226, 230);
`;
