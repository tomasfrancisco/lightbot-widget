import { Provider as StateProvider } from "mobx-react";
import { ChatStore } from "modules/Widget/modules/ChatModal";
import * as React from "react";

import { Widget } from "../Widget/Widget";

type Stores = {
  chatStore: any;
};

export class App extends React.Component<{ agentId: string }> {
  private stores: Stores;

  constructor(props) {
    super(props);

    this.stores = {
      chatStore: new ChatStore({ id: this.props.agentId }),
    };
  }

  public render() {
    return (
      <StateProvider {...this.stores}>
        <Widget />
      </StateProvider>
    );
  }
}
