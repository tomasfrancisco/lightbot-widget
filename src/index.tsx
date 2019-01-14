import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./modules/App/App";

function init() {
  const getAgentId = () => {
    const element = document.getElementById("lightbot-widget");
    let agentId;
    if (element) {
      agentId = element.getAttribute("data-agent-id");
    } else {
      agentId = "f7196e92-076a-4d42-b612-b118f5325759"; // Test agent id
    }
    return agentId;
  };

  const rootElement = document.createElement("div");
  rootElement.id = "lightbot";

  document.body.appendChild(rootElement);

  ReactDOM.render(<App agentId={getAgentId()} />, rootElement);
}

if (document.readyState === "complete") {
  init();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
