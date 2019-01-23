import { inject } from "mobx-react";
import { ChatStore } from "modules/Widget/modules/ChatModal";
import { darken } from "polished";
import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  display: inline-block;
  text-decoration: none;
  border: none;
  outline: none;
  border-radius: 50px;
  background-color: #ff8c78;
  color: white;
  padding: 1px 15px;
  min-width: 25px;
  min-height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${darken(0.1, "#FF8C78")};
  }
`;

@inject("chatStore")
export class ReportButton extends React.Component<
  {
    chatStore?: ChatStore;
  },
  { text: string }
> {
  constructor(props) {
    super(props);

    this.state = {
      text: "Feedback",
    };
  }

  public render() {
    return <Wrapper onClick={this.onClick}>{this.state.text}</Wrapper>;
  }

  private onClick = () => {
    const { chatStore } = this.props;
    if (!chatStore) {
      return;
    }

    const feedback = prompt("Please provide a feedback message", "");
    if (feedback) {
      chatStore.sendFeedback(feedback);
    }
  };
}
