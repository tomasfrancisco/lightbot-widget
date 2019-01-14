import { Scrollbars } from "components/Scrollbars";
import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import styled from "styled-components";

type ChatBodyProps = {
  footerHeight: string;
  messagesCount: number;
};

export const Wrapper = styled<ChatBodyProps, "div">("div")`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  margin-bottom: ${props => props.footerHeight};
`;

export const Content = styled("div")`
  padding: 10px 10px;
`;

export class ChatBody extends React.Component<
  ChatBodyProps,
  {
    bodyHeight: number;
  }
> {
  private scrollComponentRef;

  constructor(props) {
    super(props);

    this.state = {
      bodyHeight: 0,
    };
  }

  public componentDidUpdate(prevProps, prevState) {
    const { messagesCount } = this.props;
    const { bodyHeight } = this.state;

    if (prevProps.messagesCount !== messagesCount && this.scrollComponentRef) {
      setTimeout(this.scrollComponentRef.scrollToBottom, 100);
    }

    if (prevState.bodyHeight !== bodyHeight) {
      setTimeout(this.scrollComponentRef.scrollToBottom, 100);
    }
  }

  public render() {
    const { children, ...props } = this.props;
    const { bodyHeight } = this.state;

    return (
      <Wrapper {...props}>
        <ReactResizeDetector handleHeight={true} onResize={this.onResize} />
        <Scrollbars assignRef={this.assignScrollComponentRef} height={bodyHeight}>
          <Content>{children}</Content>
        </Scrollbars>
      </Wrapper>
    );
  }

  private assignScrollComponentRef = componentRef => {
    this.scrollComponentRef = componentRef;
  };

  private onResize = (width: number, height: number) => {
    this.setState({
      bodyHeight: height,
    });
  };
}
