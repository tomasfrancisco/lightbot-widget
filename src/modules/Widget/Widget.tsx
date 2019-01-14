import throttle from "lodash.throttle";
import { inject, observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import * as React from "react";
import Frame from "react-frame-component";
import ReactResizeDetector from "react-resize-detector";
import styled from "styled-components";

import { highestZIndex } from "../../constants/highestZIndex";
import { Hotspot } from "../Hotspot/Hotspot";
import { FrameProvider } from "./FrameProvider";
import { ChatStore } from "./modules/ChatModal/stores/ChatStore";
import { Window } from "./Window";

type FrameWrapperProps = {
  isOpen: boolean;
  isMobileVersion: boolean;
};

const FrameWrapper = styled<FrameWrapperProps, "div">("div")`
  > iframe {
    margin: 0;
    padding: 0;
    position: fixed;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    width: 400px;
    height: 0px;
    max-height: calc(100vh - 110px - 20px);
    bottom: 110px;
    right: 20px;
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
    z-index: -1;
    opacity: 0;
    transition: all 0.5s ease-in-out;

    ${props =>
      props.isMobileVersion &&
      `
      bottom: 100;
      right: 0;
      left: 0;
      height: 0;
      width: 100vw;
      max-height: 100vh;
      border-radius: 0px;
      border-width: 0px;
    `};

    ${props =>
      props.isOpen &&
      `
      z-index: ${highestZIndex};
      height: calc(100vh - 35px);
      opacity: 1;
    `} ${props =>
      props.isOpen &&
      props.isMobileVersion &&
      `
      height: 100%;
      bottom: 0;
    `};
  }
`;

@inject("chatStore")
@observer
export class Widget extends React.Component<{ chatStore?: ChatStore }> {
  constructor(props) {
    super(props);

    this.onResizeHandler = throttle(this.onResizeHandler, 500);
  }

  public render() {
    const { chatStore } = this.props;
    if (!chatStore) {
      return null;
    }

    return (
      <>
        <Hotspot />
        {this.renderFrame()}
        {process.env.NODE_ENV === "development" && <DevTools />}
      </>
    );
  }

  private renderFrame() {
    const { chatStore } = this.props;
    if (!chatStore) {
      return null;
    }
    const { agentData$, isOpen$, isMobileVersion$ } = chatStore;

    return (
      <>
        <ReactResizeDetector handleWidth={true} onResize={this.onResizeHandler} />
        <FrameWrapper isOpen={isOpen$} isMobileVersion={isMobileVersion$}>
          <Frame>
            <FrameProvider>
              <Window agentId={agentData$.id} />
            </FrameProvider>
          </Frame>
        </FrameWrapper>
      </>
    );
  }

  private onResizeHandler = width => {
    const { chatStore } = this.props;
    if (chatStore) {
      chatStore.isMobileVersion$ = width < 420;
    }
  };
}
