import { darken } from "polished";
import * as React from "react";
import { FaPaperPlane } from "react-icons/lib/fa";
import { withProps } from "recompose";
import styled from "styled-components";

const Wrapper = styled<any, "div">("div")`
  background-color: white;
  display: flex;
  width: 100%;
  align-items: center;
`;

const Form = styled<any, "form">("form")`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const MessageInput = withProps({
  cols: "40",
  rows: "2",
})(styled<any, "input">("input")`
  display: flex;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 18px;
  padding: 9px 12px;
  background-color: transparent;
  box-sizing: border-box;
  border-bottom-left-radius: 8px;
  font-family: "Assistant", sans-serif;
  resize: none;
`);

const SubmitButton = styled("button")`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 9px 12px;
  color: ${props => props.theme.messageSendBtnColor};

  &:active {
    color: ${props => darken(0.1, props.theme.messageSendBtnColor || "black")};
  }
`;

export class MessageComposer extends React.Component<
  {
    touched?: boolean;
    replyPlaceholder?: string;
    onSubmit?: (message: string) => void;
    assignRef?: (componentRef) => void;
  },
  {
    message: string;
  }
> {
  private static defaultProps = {
    onSubmit: () => null,
  };

  private messageInputRef;

  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  public render() {
    const { touched, assignRef, replyPlaceholder } = this.props;

    const replyMessage = replyPlaceholder || "Write to reply...";

    return (
      <Wrapper>
        <Form onSubmit={this.onSubmitHandler}>
          <MessageInput
            innerRef={assignRef}
            touched={touched}
            onChange={this.onChange}
            placeholder={touched ? "Loading..." : replyMessage}
            value={this.state.message}
          />
          <SubmitButton>
            <FaPaperPlane size={25} />
          </SubmitButton>
        </Form>
      </Wrapper>
    );
  }

  private onSubmitHandler = event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { message } = this.state;
    if (onSubmit && message.length) {
      onSubmit(message);
    }
    this.setState({
      message: "",
    });
  };

  private onChange = ({ target: { value } }) => {
    this.setState({
      message: value,
    });
  };
}
