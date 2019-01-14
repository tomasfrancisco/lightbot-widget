import _get from "lodash/get";
import { inject, observer } from "mobx-react";
import { HotspotTeaser } from "modules/Hotspot/HotspotTeaser";
import { ThemeProvider } from "modules/ThemeProvider";
import { ChatStore } from "modules/Widget/modules/ChatModal";
import * as React from "react";
import styled from "styled-components";

import { HotspotButton } from "./HotspotButton";

const Wrapper = styled("div")``;

@inject("chatStore")
@observer
export class Hotspot extends React.Component<
  {
    chatStore?: ChatStore;
  },
  { showTeaser: boolean }
> {
  private teaserTimeoutCb;

  constructor(props) {
    super(props);

    this.state = {
      showTeaser: false,
    };
  }

  public componentDidMount() {
    this.triggerTeaserTimeout();
  }

  public componentWillReceiveProps(nextProps) {
    const { chatStore } = this.props;

    if (chatStore) {
      const nextPropsChatStore = _get(nextProps, ["chatStore", "agentData$"]);
      if (chatStore.agentData$ !== nextPropsChatStore) {
        this.triggerTeaserTimeout();
      }
    }
  }

  public render() {
    const { chatStore } = this.props;
    if (!chatStore) {
      return null;
    }

    const { isMobileVersion$, isOpen$, agentData$ } = chatStore;

    // Undefined wasn't fetched yet
    // Null was fetched but it's empty
    if (agentData$.widgetThemeData === undefined) {
      return null;
    }

    return (
      <ThemeProvider theme={agentData$.widgetThemeData}>
        <Wrapper>
          <HotspotButton
            onClick={this.onClick}
            isOpen={isOpen$}
            isMobileVersion={isMobileVersion$}
            iconSrc={agentData$.widgetHotspotIcon}
          />
          {this.renderTeaser()}
        </Wrapper>
      </ThemeProvider>
    );
  }

  private renderTeaser() {
    const { chatStore } = this.props;
    const { showTeaser } = this.state;

    if (!chatStore || !showTeaser) {
      return null;
    }

    const { agentData$ } = chatStore;

    return <HotspotTeaser value={_get(agentData$, ["widgetTeaser"]) || "Hello! 👋"} />;
  }

  private onClick = () => {
    const { chatStore } = this.props;
    if (chatStore) {
      chatStore.toggle$();
    }

    this.cleanTeaserTimeout();
    this.setState({ showTeaser: false });
  };

  private triggerTeaserTimeout() {
    const { chatStore } = this.props;

    this.cleanTeaserTimeout();

    if (chatStore && chatStore.isOpen$) {
      return;
    }

    this.teaserTimeoutCb = setTimeout(() => this.setState({ showTeaser: true }), 5000);
  }

  private cleanTeaserTimeout() {
    clearTimeout(this.teaserTimeoutCb);
  }
}
